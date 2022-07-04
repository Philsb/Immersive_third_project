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
        let response = null;    
        const query = {
            text: `INSERT INTO Account_subscription (account_number_FK, service_id_FK, last_payed, recurrent_payment, debt_amount) 
                    VALUES ($1, $2, current_date, $3, 0.0)
                    RETURNING account_number_FK, service_id_FK;`,
           values: [ 
            subscriptionData.accountNumber, 
            subscriptionData.serviceId,
            subscriptionData.recurrentPayment]
            
        }
        response = await DbClient.query(query);
        return response.rows[0] ;
    } 

    static async deleteSubscription(subscriptionData) {
        let response = null;    
        const query = {
            text: `DELETE FROM Account_subscription WHERE account_number_FK = $1 AND service_id_FK = $2
                    RETURNING account_number_FK, service_id_FK;`,
           values: [ 
            subscriptionData.accountNumber,
            subscriptionData.serviceId]
            
        }
        response = await DbClient.query(query);
        return {message: {
            deleted: response.rows[0]
        }} ;
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
}

module.exports = ServicesService;
