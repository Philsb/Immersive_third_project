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

CREATE TABLE User_subscription (
    user_id serial references Users(user_id) CHECK (GetUserType(user_id) = 'R'),
    service_id serial references Users(user_id) CHECK (GetUserType(user_id) = 'S'),
    last_payed DATE, 
    recurrent_payment BOOLEAN NOT NULL DEFAULT false,
    debt_amount money NOT NULL DEFAULT 0.00,
    PRIMARY KEY (user_id,service_id)
);

CREATE TABLE Users_services(
    user_id serial references Users(user_id),
    description VARCHAR (300) NOT NULL,
    base_price money NOT NULL DEFAULT 0.00
); 

CREATE TABLE Account_type (
    type_id serial PRIMARY KEY,
    type_name VARCHAR(100) UNIQUE NOT NULL,
    type_description VARCHAR (256)

);

CREATE TABLE Accounts (
    account_number serial PRIMARY KEY,
    account_holder serial NOT NULL references Users(user_id),
    account_type serial NOT NULL references Account_type(type_id),
    balance money NOT NULL DEFAULT 0.00

);  

CREATE TABLE Transactions (
    transaction_id serial PRIMARY KEY,
    origin_account_number VARCHAR(30) NOT NULL,
    destination_account_number VARCHAR(30) NOT NULL,
    amount money NOT NULL DEFAULT 0.00,
    transaction_date DATE NOT NULL,
    transaction_desc VARCHAR (256) NOT NULL


);

/*CREATE TABLE Services*/

