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
