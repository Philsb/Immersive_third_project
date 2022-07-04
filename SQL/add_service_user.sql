 CREATE FUNCTION add_service_user (
    description_p VARCHAR (300),
    base_price_p money)
RETURNS int 
LANGUAGE plpgsql  
AS  $$  
DECLARE lastid int;
BEGIN  
    INSERT INTO Users(user_type) VALUES ('S') RETURNING user_id INTO lastid;
    INSERT INTO Users_services(user_id,description, base_price) VALUES (lastid,description,base_price);
    RETURN lastid;
    
    --- SQL statements / logic /condition.   
END  $$