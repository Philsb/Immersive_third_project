const express = require('express');
const contentType = require('../middleware/contentType.middleware');
const ServicesService = require('../services/services.service');
const verifyAccountForSubscription = require('../middleware/verifyAccountForSubscription.middleware');
const verifyBearerToken = require('../middleware/verifyBearerToken.middleware');
const verifyToken = require('../middleware/verifyToken.middleware');
const router = express.Router();


router.route("/services/")
.get( async (req,res, next) => {
    try {   
        let response = await ServicesService.getAllServices();
        res.status(200).json(response);
    }catch (error){
        next(error);
    }

});

router.route("/services/subscription")
.get ([verifyBearerToken,verifyToken], async (req,res, next) => {
    try {
        let decodedUser = req.decodedToken.user;
        let response = await ServicesService.getSubscribedServices(decodedUser.userId);
        res.status(200).json(response);
    
    }catch (error){
        next(error);
    }

})
.post([contentType,verifyBearerToken,verifyToken,verifyAccountForSubscription], async (req,res, next) => {
    try {
        let response = await ServicesService.addSubscription(req.body.subscriptionData);
        console.log(response);
        res.status(200).json(response);

    
    }catch (error){
        next(error);
    }

})
.delete([contentType,verifyBearerToken,verifyToken,verifyAccountForSubscription], async (req,res, next) => {
    try {
        console.log(req.body.subscriptionData);
        let response = await ServicesService.deleteSubscription(req.body.subscriptionData);
        res.status(200).json(response);
    
    }catch (error){
        next(error);
    }

})
.put([contentType,verifyBearerToken,verifyToken, verifyAccountForSubscription], async (req,res, next) => {
    try {
    
        let response = await ServicesService.changeRecurrentPayment(req.body.subscriptionData);
        if (response != null){
            res.status(200).json({modified: response});
        }
        else {
            res.status(400).json ({message: "User does not have that subscription."});
        }
        
        

    
    }catch (error){
        next(error);
    }

});

module.exports = router;