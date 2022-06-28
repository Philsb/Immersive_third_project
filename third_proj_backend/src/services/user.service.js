const DbClient = require("../configs/dbHandle.config");
class UserService {

        // Query all documents
    static async getUser (username) {
        let response = null;
        const query = {
            text : 'SELECT * FROM Users WHERE username = $1;',
            values: [username]
        }

        response = await DbClient.query(query);
        return response.rows[0];
    }

    static async addUser(userData) {
        let response = null;
        const query = {
            text: "INSERT INTO Users(username, password, firstName, lastName, email, gender, dateOfBirth, creditCardNumber, creditCardType) VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9) RETURNING *;" ,
            values: [userData.username, 
                    userData.password, 
                    userData.firstName, 
                    userData.lastName ? userData.lastName : null, 
                    userData.email, 
                    userData.gender, 
                    userData.dateOfBirth, 
                    userData.creditCardNumber ? userData.creditCardNumber : null, 
                    userData.creditCardType ? userData.creditCardType : null]
        }
        response = await DbClient.query(query);
        return response.rows[0] ;
    } 
}

module.exports = UserService;
