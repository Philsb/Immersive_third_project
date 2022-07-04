const AccountService = require("../services/account.service");

const verifyAccountForTransaction = async (req, res, next) => {
    try {
        let decodedUser = req.decodedToken.user;
        let trans = req.body.transaction;
        //Get user accounts by user id
        let originAccountNumber = Number(trans.originAccount.slice(trans.originAccount.length - 10));
        let userAccounts = await AccountService.getAccountsByUserId(decodedUser.userId);
        //Check if user has accounts and if accounts belongs to user
        
        let userAccountsId = null;
        if (userAccounts.length > 0){
            userAccountsId = userAccounts.map((item)=>{
                return item.account_number;
            });

            if (userAccountsId.includes(originAccountNumber )) {
                next();
            }
            else {
                res.status(400).json({message: "could'nt make transaction. Accounts don't match user."});
            }
        
        }
        else {
            res.status(400).json({message: "could'nt make transaction. Accounts don't match user."});
        }

    }
    catch(error) {
        next (error);
    }
    
  };
  
module.exports = verifyAccountForTransaction;