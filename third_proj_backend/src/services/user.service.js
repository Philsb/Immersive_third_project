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
            text : 'SELECT user_id, fullname, email, photo_path, source_income FROM Users_regular WHERE email = $1;',
            values: [email]
        }

        response = await DbClient.query(query);
        console.log(response.rows[0]);
        return response.rows[0];
    }

    static async addUser(userData) {
        let response = null;
        const queryAddUser = {
            text: `SELECT * FROM add_regular_user($1,$2,$3,$4,$5);`,
           values: [ 
            userData.password, 
            userData.fullname, 
            userData.email,
            userData.photo_path,
            userData.source_income]
            
        }
        response = await DbClient.query(queryAddUser);
        return {userId: response.rows[0].add_regular_user} ;
    } 

    static async updateUser (userData) {

    }

    static async deleteUser (userData){

    }
}

module.exports = UserService;
