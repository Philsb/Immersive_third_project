const DbClient = require("../configs/dbHandle.config");
class TransactionService {

        // Query all documents
    static async makeTransaction (transactionInfo) {
        let response = null;
        const query = {
            text : 'SELECT * FROM make_transaction($1,$2,$3,$4 );',
            values: [transactionInfo.origin_account,
                    transactionInfo.dest_account,
                    transactionInfo.amount,
                    transactionInfo.description]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }

    static async makeTransactionFromExternal (transactionInfo) {
        let response = null;
        const query = {
            text : 'SELECT * FROM make_transaction_from_external($1,$2,$3,$4 );',
            values: [transactionInfo.origin_account,
                    transactionInfo.dest_account,
                    transactionInfo.amount,
                    transactionInfo.description]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }

    static async makeTransactionToExternal (transactionInfo) {
        let response = null;
        const query = {
            text : 'SELECT * FROM make_transaction_to_external($1,$2,$3,$4 );',
            values: [transactionInfo.origin_account,
                    transactionInfo.dest_account,
                    transactionInfo.amount,
                    transactionInfo.description]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }
}

module.exports = TransactionService;