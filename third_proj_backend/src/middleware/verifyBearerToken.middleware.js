const verifyBearerToken = (req, res, next) => {

    const regexTest = new RegExp ("^Bearer .+");
    const headers = req.headers["authorization"];
    if (headers == undefined || !regexTest.test(headers)) {
        res.status(400).json("Bad Bearer Token.");
    } else {
        req.token = req.headers["authorization"].split(" ")[1];
        next();
    }
  };
  
  module.exports = verifyBearerToken;