const DbClient = require("../configs/dbHandle.config");
class UserService {

    // Query all documents
    static async getUserById (userId) {
        let response = null;
        const query = {
            text : 'SELECT * FROM Users_regular WHERE user_id = $1;',
            values: [userId]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }
    
    
    
    // Query all documents
    static async getUserByEmail (email) {
        let response = null;
        const query = {
            text : 'SELECT * FROM Users_regular WHERE email = $1;',
            values: [email]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }

    static async getUserDetailsById (userId){
        let response = null;
        const query = {
            text : 'SELECT user_id, fullname, email, photo_path, source_income FROM Users_regular WHERE user_id = $1;',
            values: [userId]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }

    static async getUserSubscriptionsByUserId (userId){
        let response = null;    
        const queryAddUser = {
            text: `SELECT * FROM User_subscription JOIN Accounts ON CAST(RIGHT(origin_account_number,10) AS INT) = Accounts.account_number WHERE Accounts.Account_holder = $1;`,
           values: [userId]
            
        }
        response = await DbClient.query(queryAddUser);
        return {userId: response.rows} ;
    }
    static async getUserHistoryByUserId (userId) {
        let response = null;    
        const queryAddUser = {
            text: `SELECT * FROM Transactions JOIN Accounts ON CAST(RIGHT(origin_account_number,10) AS INT) = Accounts.account_number WHERE Accounts.Account_holder = $1;`,
           values: [userId]
            
        }
        response = await DbClient.query(queryAddUser);
        return {userId: response.rows} ;
    }
    static async addUser(userData) {
        console.log(userData);
        let response = null;    
        const queryAddUser = {
            text: `SELECT * FROM add_regular_user($1,$2,$3,$4,$5);`,
           values: [ 
            userData.password, 
            userData.fullname, 
            userData.email,
            userData.photoPath,
            userData.sourceIncome]
            
        }
        response = await DbClient.query(queryAddUser);
        return response.rows[0].add_regular_user ;
    } 

    static async updateRegularUserDetails (userData) {
        let response = null;    
        const queryAddUser = {
            text: `UPDATE Regular_user SET fullname = $2, email = $3, photo_path = $4, source_income = $5 WHERE user_id = $1 ;`,
           values: [  
            userData.userId,
            userData.fullname, 
            userData.email,
            userData.photoPath,
            userData.sourceIncome]
            
        }
        response = await DbClient.query(queryAddUser);
        return {userId: response.rows[0].add_regular_user} ;
    }

    static async updateRegularUserPassword (userData) {
        let response = null;    
        const queryAddUser = {
            text: `UPDATE Regular_user SET password = $2 WHERE user_id = $1`,
           values: [userData.userId,userData.newPassword]
            
        }
        response = await DbClient.query(queryAddUser);
        return {userId: response.rows[0].add_regular_user} ;
    }


    static async deleteUser (userData){

    }
}

module.exports = UserService;
