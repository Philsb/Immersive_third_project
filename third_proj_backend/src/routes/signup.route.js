const express = require('express');
const contentType = require('../middleware/contentType.middleware');
const userService = require ("../services/user.service");
const jwt = require('jsonwebtoken');
const AccountService = require('../services/account.service');
const router = express.Router();



router.route("/signup/")
.post(contentType, async (req,res, next) => {
    try {
        let response =  await userService.addUser(req.body.signup);
        await AccountService.addAccount({userId:  response, accountType: "colones"});
        await AccountService.addAccount({userId:  response, accountType: "dollars"});
        
        let userInfo = await userService.getUserById(response);
        const tokenInfo = {user: {
                                userId: userInfo.user_id,
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