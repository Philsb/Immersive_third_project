const AccountService = require("../services/account.service");

const verifyAccountForSubscription = async (req, res, next) => {
    try {
        let decodedUser = req.decodedToken.user;
        let subData = req.body.subscriptionData;
        if (subData){
            subData.userId = decodedUser.userId;
            let userAccounts = await AccountService.getAccountsByUserId(decodedUser.userId);
            
            let foundAccount = userAccounts.find(item => item.account_number == subData.accountNumber) 
            
            if (foundAccount != undefined) {

                next();
            }
            else {
                res.status(400).json ({message: "User account and body account don't match."});
            }
        }
        else {
            res.status(400).json ({message: "Bad request info."});
        }
        

    }
    catch(error) {
        next (error);
    }
    
  };
  
module.exports = verifyAccountForSubscription;