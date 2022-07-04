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
        let response = await UserService.getUserDetailsById(decodedUser.userId);
        res.status(200).json({user: response});
    }catch (error){
        next(error);
    }


})
.put([contentType,verifyBearerToken,verifyToken], async (req,res, next) => {
    try {
        let decodedUser = req.decodedToken.user;
        let userData = req.body.userData;
        userData.userId = decodedUser.userId;
        let response = await UserService.updateRegularUserDetails(userData);
        res.status(200).json({user: response});
    }catch (error){
        next(error);
    }


})




module.exports = router;