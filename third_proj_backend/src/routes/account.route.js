const express = require('express');
const contentType = require('../middleware/contentType.middleware');
const AccountService = require('../services/account.service');
const verifyBearerToken = require('../middleware/verifyBearerToken.middleware');
const verifyToken = require('../middleware/verifyToken.middleware');
const router = express.Router();


router.route("/account/")
.get([verifyBearerToken, verifyToken], async (req,res, next) => {
    try {
        let decodedUser = req.decodedToken.user;
        let response = await AccountService.getAccountsByUserId(decodedUser.userId);
        res.status(200).json(response);
    }catch (error){
        next(error);
    }


})
.post ([contentType, verifyBearerToken, verifyToken], async (req,res, next) => {
    try {
        let decodedUser = req.decodedToken.user;
        let accountData = {};
        accountData.accountType = req.body.accountData.accountType;
        accountData.userId = decodedUser.userId;

        
        let response = await AccountService.addAccount(accountData);
        res.status(200).json(response);
    }catch (error){
        next(error);
    }


})
.delete([contentType, verifyBearerToken,verifyToken], async (req,res, next) => {
    try {
    
        res.status(200).json({message: "not implemented yet"});
    }catch (error){
        next(error);
    }


})




module.exports = router;