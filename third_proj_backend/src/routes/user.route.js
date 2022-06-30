const express = require('express');
const contentType = require('../middleware/contentType.middleware');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const verifyBearerToken = require('../middleware/verifyBearerToken.middleware');
const verifyToken = require('../middleware/verifyToken.middleware');
const router = express.Router();


router.route("/user/")
.get([verifyBearerToken, verifyToken], async (req,res, next) => {
    try {
        let decodedUser = req.decodedToken.user;
        console.log(decodedUser.email)
        let response = await UserService.getUserByEmail(decodedUser.email);
        res.status(200).json({user: response});
    }catch (error){
        next(error);
    }


});

router.route("/user/history/")
.get(contentType, async (req,res, next) => {
    ;
    try {
        
        
    }catch (error){
        next(error);
    }


});

router.route ("/user/subscriptions/")
.get(contentType, async (req,res, next) => {
    ;
    try {
        
        
    }catch (error){
        next(error);
    }


});


module.exports = router;