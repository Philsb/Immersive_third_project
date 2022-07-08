const DbClient = require("../configs/dbHandle.config");
class TransactionService {

    static async getTransactionsById (userId) {
        let response = null;
        const query = {
            text : `SELECT * FROM Transactions 
                    JOIN Accounts ON CAST (RIGHT(Transactions.origin_account_number,10) AS INT) = Accounts.account_number 
                    OR CAST (RIGHT(Transactions.destination_account_number,10) AS INT) = Accounts.account_number 
                    JOIN Account_type ON Accounts.account_type = Account_type.type_id
                    WHERE Accounts.account_holder = $1`,
            values: [userId]
        }

        response = await DbClient.query(query);
        return response.rows;
    }
        // Query all documents
    static async makeTransaction (transactionInfo) {
        let response = null;
        const query = {
            text : 'SELECT * FROM make_transaction($1,$2,$3,$4,$5 );',
            values: [transactionInfo.originAccount,
                    transactionInfo.destAccount,
                    transactionInfo.amount,
                    transactionInfo.description,
                    new Date(Date.now()).toISOString()]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }

    static async makeTransactionFromExternal (transactionInfo) {
        let response = null;
        const query = {
            text : 'SELECT * FROM make_transaction_from_external($1,$2,$3,$4,$5 );',
            values: [transactionInfo.originAccount,
                    transactionInfo.destAccount,
                    transactionInfo.amount,
                    transactionInfo.description,
                    new Date(Date.now()).toISOString()]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }

    static async makeTransactionToExternal (transactionInfo) {
        let response = null;
        const query = {
            text : 'SELECT * FROM make_transaction_to_external($1,$2,$3,$4,$5 );',
            values: [transactionInfo.originAccount,
                    transactionInfo.destAccount,
                    transactionInfo.amount,
                    transactionInfo.description,
                    new Date(Date.now()).toISOString()]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }

    static async makeTransactionToService (transactionInfo) {
        let response = null;

        //Checks account type of service
        let serviceAccountQueryResp = null;
        const serviceAccountQuery = {
            text: `SELECT account_number FROM Accounts 
                    WHERE account_holder = $1 
                    AND account_type = 
                    (SELECT account_type FROM Accounts WHERE account_number = (CAST (RIGHT($2,10) AS INT)))`,
            values: [transactionInfo.serviceUserId, transactionInfo.originAccount]
        }
        serviceAccount = await DbClient.query(serviceAccountQuery);
        //If service account type valid make query
        if (serviceAccountQueryResp.rows[0]) {
            const query = {
                text : 'SELECT * FROM make_transaction_to_service($1,$2,$3,$4,$5);',
                values: [transactionInfo.originAccount,
                        serviceAccountQueryResp.rows[0],
                        transactionInfo.amount,
                        transactionInfo.description,
                        new Date(Date.now()).toISOString()]
            }
            response = await DbClient.query(query);
            return response.rows[0];

        }
        else {
            return -1;
        }
    }
}

module.exports = TransactionService;