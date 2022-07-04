CREATE TYPE income AS ENUM ('employed', 'bussiness owner', 'self-employed', 'retired', 'investor', 'other');
CREATE TYPE user_type AS ENUM ('S', 'R', 'A');



CREATE TABLE Users (
    user_id serial PRIMARY KEY,
    user_type user_type NOT NULL
);

CREATE TABLE Users_regular(
    user_id serial references Users(user_id),
    password VARCHAR (50) NOT NULL,
	fullname VARCHAR (50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE CHECK (email ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    photo_path varchar,
    source_income income NOT NULL DEFAULT 'employed'

);

 CREATE FUNCTION GetUserType (
    userID integer
)
RETURNS char(1)
LANGUAGE plpgsql
AS
$$
BEGIN
    return (SELECT user_type FROM Users WHERE user_id = userID);
END; 
$$;

CREATE FUNCTION UserHasAccount (
    user_id_p integer,
    account_number_p integer
)
RETURNS BOOLEAN
AS
$$
BEGIN
    return EXISTS (SELECT Account_number FROM Accounts WHERE account_holder = user_id_p and account_number = account_number_p) ;
END; 
$$ LANGUAGE plpgsql;



CREATE TABLE Users_services(
    user_id serial references Users(user_id),
    description VARCHAR (300) NOT NULL,
    base_price money NOT NULL DEFAULT 0.00,
    sub_time INTERVAL NOT NULL
); 

CREATE TABLE Account_type (
    type_id serial PRIMARY KEY,
    type_name VARCHAR(100) UNIQUE NOT NULL,
    type_description VARCHAR (256)

);

INSERT INTO Account_type (type_name, type_description) VALUES ('dollars', 'US Currency');
INSERT INTO Account_type (type_name, type_description) VALUES ('colones', 'US Currency');

CREATE TABLE Accounts (
    account_number serial PRIMARY KEY,
    is_service_account BOOLEAN NOT NULL DEFAULT FALSE,
    account_holder serial NOT NULL references Users(user_id),
    account_type serial NOT NULL references Account_type(type_id),
    balance money NOT NULL DEFAULT 0.00 CHECK (CAST(balance AS NUMERIC) >= 0.0)

);  

CREATE TABLE Account_subscription (  
    account_number_FK int references Accounts(account_number),
    service_id_FK serial references Users(user_id) CHECK (GetUserType(service_id_FK) = 'S'),
    last_payed DATE, 
    recurrent_payment BOOLEAN NOT NULL DEFAULT false,
    debt_amount money NOT NULL DEFAULT 0.00 CHECK (CAST(debt_amount AS NUMERIC) >= 0.0),
    PRIMARY KEY (account_number_FK ,service_id_FK)
);

CREATE TABLE Transactions (
    transaction_id serial PRIMARY KEY,
    origin_account_number VARCHAR(30) NOT NULL,
    destination_account_number VARCHAR(30) NOT NULL,
    amount money NOT NULL DEFAULT 0.00,
    transaction_date DATE NOT NULL,
    transaction_desc VARCHAR (256) NOT NULL


);

 CREATE FUNCTION add_service_user (
    description_p VARCHAR (300),
    base_price_p money,
    sub_time_p interval)
RETURNS int 
LANGUAGE plpgsql  
AS  $$  
DECLARE lastid int;
BEGIN  
    INSERT INTO Users(user_type) VALUES ('S') RETURNING user_id INTO lastid;
    INSERT INTO Users_services(user_id,description, base_price, sub_time) VALUES (lastid,description_p,base_price_p,sub_time_p);
    INSERT INTO Accounts (is_service_account, account_holder, account_type) VALUES (TRUE,lastid, (SELECT type_id from Account_type WHERE type_name = 'dollars'));
    INSERT INTO Accounts (is_service_account, account_holder, account_type) VALUES (TRUE,lastid, (SELECT type_id from Account_type WHERE type_name = 'colones'));
    RETURN lastid;
    
    --- SQL statements / logic /condition.   
END  $$;

CREATE FUNCTION add_regular_user (
    password_p VARCHAR (50),
	fullname_p VARCHAR (50),
    email_p VARCHAR(50),
    photo_path_p varchar,
    source_income_p income) 
RETURNS int 
LANGUAGE plpgsql  
AS  $$  
DECLARE lastid int;
BEGIN  
    INSERT INTO Users(user_type) VALUES ('R') RETURNING user_id INTO lastid;
    INSERT INTO Users_regular(user_id,password, fullname, email, photo_path, source_income) VALUES (lastid,password_p, fullname_p, email_p, photo_path_p, source_income_p);
    RETURN lastid;
    
    --- SQL statements / logic /condition.   
END  $$;

CREATE FUNCTION make_transaction (
    origin_account_id_p VARCHAR(30),
	destination_account_id_p VARCHAR(30),
    amount_p money,
    transaction_desc_p VARCHAR(256) ) 
RETURNS int 
LANGUAGE plpgsql  
AS  $$  
DECLARE lastid int;
BEGIN  
    UPDATE Accounts SET balance = balance - amount_p WHERE Account_number  = CAST (RIGHT(origin_account_id_p,10) AS INT);
    UPDATE Accounts SET balance = balance + amount_p WHERE Account_number = CAST (RIGHT(destination_account_id_p,10) AS INT);
    
    INSERT INTO Transactions (origin_account_number,destination_account_number,amount,transaction_date,transaction_desc) VALUES (origin_account_id_p ,destination_account_id_p,amount_p,current_date,transaction_desc_p) RETURNING transaction_id INTO lastid;
    RETURN lastid;
    
    --- SQL statements / logic /condition.   
END  $$;

CREATE FUNCTION make_transaction_to_external (
    origin_account_id_p VARCHAR(30),
	destination_account_id_p VARCHAR(30),
    amount_p money,
    transaction_desc_p VARCHAR(256) ) 
RETURNS int 
LANGUAGE plpgsql  
AS  $$  
DECLARE lastid int;
BEGIN  
    UPDATE Accounts SET balance = balance - amount_p WHERE Account_number  = CAST (RIGHT(origin_account_id_p,10) AS INT);
    
    INSERT INTO Transactions (origin_account_number,destination_account_number,amount,transaction_date,transaction_desc) VALUES (origin_account_id_p ,destination_account_id_p,amount_p,current_date,transaction_desc_p) RETURNING transaction_id INTO lastid;
    RETURN lastid;
    
    --- SQL statements / logic /condition.   
END  $$;

CREATE FUNCTION make_transaction_from_external (
    origin_account_id_p VARCHAR(30),
	destination_account_id_p VARCHAR(30),
    amount_p money,
    transaction_desc_p VARCHAR(256) ) 
RETURNS int 
LANGUAGE plpgsql  
AS  $$  
DECLARE lastid int; 
BEGIN  
    UPDATE Accounts SET balance = balance + amount_p WHERE Account_number = CAST (RIGHT(destination_account_id_p,10) AS INT);
    
    INSERT INTO Transactions (origin_account_number,destination_account_number,amount,transaction_date,transaction_desc) VALUES (origin_account_id_p ,destination_account_id_p,amount_p,current_date,transaction_desc_p) RETURNING transaction_id INTO lastid;
    RETURN lastid;
    
    --- SQL statements / logic /condition.   
END  $$;

CREATE FUNCTION make_transaction_to_service (
    origin_account_id_p VARCHAR(30),
	service_account_num_p VARCHAR(30),
    amount_p money,
    transaction_desc_p VARCHAR(256) ) 
RETURNS int 
LANGUAGE plpgsql  
AS  $$  
DECLARE lastid int; 
origin_ac_num_parsed int;
service_ac_num_parsed int;
service_user_num int;
BEGIN  

    origin_ac_num_parsed := (CAST (RIGHT(origin_account_id_p,10) AS INT));
    service_ac_num_parsed := (CAST (RIGHT(service_account_num_p,10) AS INT));
    service_user_num := (SELECT account_holder FROM Accounts WHERE account_number = service_ac_num_parsed);
    IF (EXISTS (SELECT account_number_FK, service_id_FK FROM Account_subscription WHERE account_number_FK = origin_ac_num_parsed AND service_id_FK = service_user_num))
    THEN
        UPDATE Accounts SET balance = (balance - amount_p) WHERE Account_number = origin_ac_num_parsed;
        UPDATE Account_subscription SET debt = debt - amount_p, last_payed = current_date WHERE  account_number_FK = origin_ac_num_parsed AND service_id_FK = service_user_num;
        
  
        UPDATE Accounts SET balance = balance + amount_p WHERE account_number = service_ac_num_parsed;
        INSERT INTO Transactions (origin_account_number,destination_account_number,amount,transaction_date,transaction_desc) VALUES (origin_account_id_p ,service_account_num_p,amount_p,current_date,transaction_desc_p) RETURNING transaction_id INTO lastid;
    ELSE 
        lastid := -1;
    END IF;
    RETURN lastid;
    
    --- SQL statements / logic /condition.   
END  $$;

SELECT * FROM add_service_user ('Servicio de agua', CAST(1500 AS MONEY), '1 hour');
SELECT * FROM add_service_user ('Servicio de electricidad',  CAST(5000 AS MONEY), '1 hour');