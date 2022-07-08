const error = (err, req, res, next) => {
    if (err.name === "ValidationError") {
      res.status(400).json(err.message);
    } else {
      res.status(500).json(err.message);
    }
  };
  
module.exports = error;