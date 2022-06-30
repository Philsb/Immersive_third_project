const express = require('express');
const contentType = require('../middleware/contentType.middleware');
const userService = require ("../services/user.service");
const jwt = require('jsonwebtoken');
const AccountService = require('../services/account.service');
const router = express.Router();



router.route("/signup/")
.post(contentType, async (req,res, next) => {
    try {
        console.log("post signup");
        let response =  await userService.addUser(req.body.user);
        
        await AccountService.addAccount({userId:  response.userId, accountType: "colones"});
        await AccountService.addAccount({userId:  response.userId, accountType: "dollars"});
        
        let userInfo = userService.getUserById(response.userId);
        const tokenInfo = {user: {
                                userId: response.user_id,
                                fullname: userInfo.fullname,
                                email: userInfo.email

                            }};
        const token = jwt.sign(tokenInfo, process.env.SECRET_KEY);      
        res.status(200).json({token: token});
    }catch (error){
        next(error);
    }

});

module.exports = router;