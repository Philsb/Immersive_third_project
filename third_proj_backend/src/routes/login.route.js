const express = require('express');
const contentType = require('../middleware/contentType.middleware');
const userService = require ("../services/user.service");
const jwt = require('jsonwebtoken');
const router = express.Router();


router.route("/login/")
.post(contentType, async (req,res, next) => {
    try {

        let user = req.body.user;
        let response =  await userService.getUserByEmail(user.email);
        if (response && response.password == user.password){

            const tokenInfo = {user: {
                userId: response.user_id,
                fullname: response.fullname,
                email: response.email

            }};
            const token = jwt.sign(tokenInfo, process.env.SECRET_KEY);
            res.status(200).json({token: token});
        }
        else {
            res.status(401).json({message:"login failed, incorrect user or password"});
        }
        
        
    }catch (error){
        next(error);
    }


});

module.exports = router;