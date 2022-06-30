const express = require('express');
const contentType = require('../middleware/contentType.middleware');
const verifyBearerToken = require ("../middleware/verifyBearerToken.middleware");
const verifyToken = require ("../middleware/verifyToken.middleware");
const transactionService = require ("../services/transaction.service");
const accountService = require ("../services/account.service");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.route("/transaction/")
.post([contentType, verifyBearerToken, verifyToken], async (req,res, next) => {
    try {
        let decodedUser = req.decodedToken.user;
        let trans = req.body.transaction;
        //Get user accounts by user id
        let originAccount = await accountService.getAccountByAccountNumber(Number(trans.origin_account.slice(trans.origin_account.length - 10)));
        let destinationAccount = await accountService.getAccountByAccountNumber(Number(trans.dest_account.slice(trans.dest_account.length - 10)));
        
        
        let userAccounts = await accountService.getAccountsByUserId(decodedUser.userId);
        console.log(userAccounts);
        //Check if user has accounts and if accounts belongs to user
        
        
        let userAccountsId = null;
        if (userAccounts.length > 0){
            userAccountsId = userAccounts.map((item)=>{
                return item.account_number;
            });
            
            console.log(originAccount);
            if (originAccount.account_type != destinationAccount.account_type){
                res.status(400).json({message: "Accounts types dont match."});
            }

            if (userAccountsId.includes(originAccount.account_number )) {
                let transactionRes = await transactionService.makeTransaction(trans);
                res.status(200).json({message: "made transaction"});
            }
            else {
                res.status(400).json({message: "could'nt make transaction."});
            }
        
        }
        else {
            res.status(400).json({message: "could'nt make transaction. User doesn't have accounts or accounts don't match logged user."});
        }


        //If the origin account matches the one the user accounts the make the transaction 
        
        
    }catch (error){
        next(error);
    }

});


router.route("/transaction/fromexternal")
.post([contentType], async (req,res, next) => {
    try {
        let trans = req.body.transaction;
        let transactionRes = await transactionService.makeTransactionFromExternal(trans);   
        res.status(200).json({message: "made transaction"});

        //If the origin account matches the one the user accounts the make the transaction 
        
        
    }catch (error){
        next(error);
    }

});

router.route("/transaction/toexternal")
.post([contentType,verifyBearerToken,verifyToken], async (req,res, next) => {
    try {
        let decodedUser = req.decodedToken.user;
        let trans = req.body.transaction;
        
        //Get user accounts by user id
        let originAccount = await accountService.getAccountByAccountNumber(Number(trans.origin_account.slice(trans.origin_account.length - 10)));
        
        
        
        let userAccounts = await accountService.getAccountsByUserId(decodedUser.userId);
        //Check if user has accounts and if accounts belongs to user  
        let userAccountsId = null;
        if (userAccounts.length > 0){
            userAccountsId = userAccounts.map((item)=>{
                return item.account_number;
            });

            if (userAccountsId.includes(originAccount.account_number )) {
                let transactionRes = await transactionService.makeTransactionToExternal(trans);
                res.status(200).json({message: "made transaction"});
            }
            else {
                res.status(400).json({message: "could'nt make transaction."});
            }
        
        }
        else {
            res.status(400).json({message: "could'nt make transaction. User doesn't have accounts or accounts don't match logged user."});
        }


        //If the origin account matches the one the user accounts the make the transaction 
        
        
    }catch (error){
        next(error);
    }


});


module.exports = router;