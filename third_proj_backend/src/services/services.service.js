const DbClient = require("../configs/dbHandle.config");
class ServicesService {

        // Query all documents
        static async getAllServices () {
            let response = null;
            const query = {
                text : 'SELECT * FROM Users_services;'
            }
    
            response = await DbClient.query(query);
            return response.rows;
        }
        static async getAllSubscriptions () {
            let response = null;
            const query = {
                text : 'SELECT * FROM Account_subscription JOIN Users_services ON Account_subscription.service_id_fk = Users_services.user_id;'
            }
    
            response = await DbClient.query(query);
            return response.rows;
        }
    

        static async addDebt (accountNumber, serviceId, amount) {
            let response = null;    
            const query = {
                text: `UPDATE Account_subscription SET debt_amount = CAST($3 AS money) WHERE account_number_FK = $1 AND service_id_FK = $2
                        RETURNING recurrent_payment;`,
            values: [ 
                accountNumber,
                serviceId,
                amount.toString().replace(".", ",")]
                
            }
            response = await DbClient.query(query);
            return response.rows[0] ;
        }
    // Query all documents
    static async getService (serviceId) {
        let response = null;
        const query = {
            text : 'SELECT * FROM Users_service WHERE user_id = $1;',
            values: [serviceId]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }

    static async addService(serviceData) {
        let response = null;    
        const query = {
            text: `SELECT * FROM add_service_user($1,$2,$3);`,
           values: [ 
            serviceData.description, 
            serviceData.basePrice,
            serviceData.subTime]
            
        }
        response = await DbClient.query(query);
        return response.rows[0].add_service_user ;
    } 

    static async addSubscription(subscriptionData) {
        let firstResponse = null;    
        const query = {
            text: `INSERT INTO Account_subscription (account_number_FK, service_id_FK, last_payed, recurrent_payment, debt_amount) 
                    VALUES ($1, $2, $4, $3, 0.0)
                    RETURNING *`,
           values: [ 
            subscriptionData.accountNumber, 
            subscriptionData.serviceId,
            subscriptionData.recurrentPayment,
            new Date(Date.now()).toISOString()]
            
        }
        firstResponse = await DbClient.query(query);
        if (firstResponse.rows.length > 0) {
            const subquery = {
                text: `SELECT * 
                        FROM Account_subscription JOIN Accounts 
                        ON Account_subscription.account_number_FK = Accounts.account_number
                        JOIN Users_services ON Account_subscription.service_id_FK = Users_services.user_id
                        WHERE Account_subscription.account_number_FK = $1 AND Account_subscription.service_id_FK = $2;`,
               values: [ 
                subscriptionData.accountNumber, 
                subscriptionData.serviceId]
                
            }
            return  (await DbClient.query(subquery)).rows[0];

        }
        return firstResponse.rows[0] ;
    } 

    static async deleteSubscription(subscriptionData) {
        let response = null;    
        const query = {
            text: `DELETE FROM Account_subscription WHERE account_number_FK = $1 AND service_id_FK = $2
                    RETURNING *`,
           values: [ 
            subscriptionData.accountNumber,
            subscriptionData.serviceId]
            
        }
        response = await DbClient.query(query);
        return response.rows[0];
    }
    

    static async changeRecurrentPayment(subscriptionData) {
        let response = null;    
        const query = {
            text: `UPDATE Account_subscription SET recurrent_payment = $3 WHERE account_number_FK = $1 AND service_id_FK = $2
                    RETURNING recurrent_payment;`,
           values: [ 
            subscriptionData.accountNumber,
            subscriptionData.serviceId,
            subscriptionData.recurrentPayment]
            
        }
        response = await DbClient.query(query);
        return response.rows[0] ;
    }

    static async getSubscribedServices (userId) {
        let response = null;    
        
        const query = {
            text: `SELECT * 
                   FROM Account_subscription JOIN Accounts 
                   ON Account_subscription.account_number_FK = Accounts.account_number
                   JOIN Users_services ON Account_subscription.service_id_FK = Users_services.user_id
                   WHERE Accounts.account_holder = $1;`,
           values: [userId]
            
        }
        response = await DbClient.query(query);
        return response.rows ; 
    }

    static async payService (accountNumber, serviceAccountNumber,amount, description) {
        let response = null;    
        const query = {
            text: `SELECT * 
                   FROM make_transaction_to_service($1,$2,$3,$4,$5)`,
           values: [accountNumber, serviceAccountNumber,amount, description, new Date(Date.now()).toISOString()]
            
        }
        response = await DbClient.query(query);
        return response.rows ; 
    }
}

module.exports = ServicesService;
