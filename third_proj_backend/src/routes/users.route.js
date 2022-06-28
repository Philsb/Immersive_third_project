const express = require('express');
const contentType = require('../middleware/contentType.middleware');
const userService = require ("../services/user.service");
const jwt = require('jsonwebtoken');
const router = express.Router();


router.route("/login/")
.post(contentType, async (req,res, next) => {
    ;
    try {

        let user = req.body.user;
        let userInfo =  await userService.getUser(user.username);
        if (userInfo && userInfo.password == user.password){
            const userResponseInfo = {username:userInfo.username,
                                        email: userInfo.email,
                                        firstName: userInfo.firstname,
                                        lastName: userInfo.lastname,
                                        gender: userInfo.gender,
                                        dateOfBirth: userInfo.dateofbirth,
                                        creditCardNumber: userInfo.creditcardnumber,
                                        creditCardType: userInfo.creditcardtype};
            const tokenInfo = {user:{username:userInfo.username, email:userInfo.fullName}};
            const token = jwt.sign(tokenInfo, process.env.SECRET_KEY);
            res.status(200).json({token: token, user: userResponseInfo});
        }
        else {
            res.status(401).json({message:"login failed, incorrect user or password"});
        }
        
        
    }catch (error){
        next(error);
    }


})

router.route("/signup/")
.post(contentType, async (req,res, next) => {
    try {
        
        let userInfo =  await userService.addUser(req.body.user);

        const userResponseInfo =  {username:userInfo.username,
                                    email: userInfo.email,
                                    firstName: userInfo.firstname,
                                    lastName: userInfo.lastname,
                                    gender: userInfo.gender,
                                    dateOfBirth: userInfo.dateofbirth,
                                    creditCardNumber: userInfo.creditcardnumber,
                                    creditCardType: userInfo.creditcardtype};
        const tokenInfo = {user:{username:userInfo.username, email:userInfo.fullName}};
        const token = jwt.sign(tokenInfo, process.env.SECRET_KEY);
        
        res.status(200).json({token: token, user: userResponseInfo});
    }catch (error){
        next(error);
    }

})


module.exports = router;