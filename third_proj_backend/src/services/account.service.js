const DbClient = require("../configs/dbHandle.config");
class AccountService {

    
    static async getAccountByAccountNumber (AccountNumber) {
        let response = null;
        const query = {
            text : `SELECT account_number, account_holder, type_name, type_description, balance 
                    FROM Accounts JOIN Account_type ON Accounts.account_type = Account_type.type_id
                    WHERE account_number = $1;`,
            values: [AccountNumber]
        }
        
        response = await DbClient.query(query);
        return response.rows[0];
    }
    
    
    static async getAccountsByUserId (userId) {
        let response = null;
        console.log("ACcount holder: ", userId);
        const query = {
            text : `SELECT account_number, account_holder, type_name, type_description, type_abbreviation, balance 
                    FROM Accounts JOIN Account_type ON Accounts.account_type = Account_type.type_id
                    WHERE account_holder = $1;`,
            values: [userId]
        }
        
        
        response = await DbClient.query(query);
        return response.rows;
    }

    static async addAccount(accountData) {
        let response = null;
        const queryAddAccount = {
            text: `INSERT INTO Accounts (account_holder, account_type) 
                    VALUES ($1, (SELECT type_id FROM Account_type WHERE type_name = $2)) 
                    RETURNING account_number;`,
            values: [ 
                    accountData.userId, 
                    accountData.accountType]
            
        } 
        response = await DbClient.query(queryAddAccount);
        return response.rows[0] ;
    } 

    static async updateAccount (userData) {

    }

    static async deleteAccount (userData){

    }
}

module.exports = AccountService;