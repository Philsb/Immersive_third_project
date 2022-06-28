const jwt = require ("jsonwebtoken");

const verifyToken = (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY , (err, decoded) =>  {
    if(!err){
        req.decodedToken = decoded;
        next();
    } else {
      res.status(400).json({message:"Cant verify token."});
    }
  })
};
  
  module.exports = verifyToken;