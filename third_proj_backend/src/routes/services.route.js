const express = require('express');
const contentType = require('../middleware/contentType.middleware');

const jwt = require('jsonwebtoken');
const router = express.Router();


router.route("/services/")
.post(contentType, async (req,res, next) => {
    try {
        
    
        
        res.status(200).json({token: token, user: userResponseInfo});
    }catch (error){
        next(error);
    }

});
