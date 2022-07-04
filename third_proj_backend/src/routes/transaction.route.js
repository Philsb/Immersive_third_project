const express = require('express');
const contentType = require('../middleware/contentType.middleware');
const verifyBearerToken = require ("../middleware/verifyBearerToken.middleware");
const verifyToken = require ("../middleware/verifyToken.middleware");
const transactionService = require ("../services/transaction.service");
const accountService = require ("../services/account.service");
const verifyAccountForTransaction = require('../middleware/verifyAccountForTransaction.middleware');
const router = express.Router();

router.route("/transaction/")
.get ([verifyBearerToken, verifyToken], async (req,res, next) => {
    try {
        let decodedUser = req.decodedToken.user;
        console.log(decodedUser.email)
        let response = await transactionService.getTransactionsById(decodedUser.userId);
        res.status(200).json({user: response});
        

    }catch (error){
        next(error);
    }

})
.post([contentType, verifyBearerToken, verifyToken, verifyAccountForTransaction ], async (req,res, next) => {
    try {
        let trans = req.body.transaction;
        let originAccount = await accountService.getAccountByAccountNumber(Number(trans.originAccount.slice(trans.originAccount.length - 10)));
        let destinationAccount = await accountService.getAccountByAccountNumber(Number(trans.destAccount.slice(trans.destAccount.length - 10)));

        //Check accounts dont match
        if (originAccount.account_type != destinationAccount.account_type){
            res.status(400).json({message: "Accounts types dont match."});
        }
        
        let transactionRes = await transactionService.makeTransaction(trans);
        res.status(200).json({message: "made transaction"});

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
.post([contentType,verifyBearerToken,verifyToken, verifyAccountForTransaction], async (req,res, next) => {
    try {
        let trans = req.body.transaction;
        let transactionRes = await transactionService.makeTransactionToExternal(trans);
        res.status(200).json({message: "made transaction"});
        //If the origin account matches the one the user accounts the make the transaction 
        
    }catch (error){
        next(error);
    }


});

router.route("/transaction/service")
.post([contentType,verifyBearerToken,verifyToken, verifyAccountForTransaction], async (req,res, next) => {
    try {
        let trans = req.body.transaction;
        let response = await transactionService.makeTransactionToService();
        if (response != -1) {
            res.status(200).json({message: "made transaction"});
        }
        else {
            res.status(200).json({message: "Bad service or account type!"});
        }
        
        
    }catch (error){
        next(error);
    }


});


module.exports = router;