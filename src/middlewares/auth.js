const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).send("Please provide an Authorization header...");
    } 
    const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
    if(decoded.role=="Admin"){
        next();
    }
    else{
        res.status(400).json({ status: false, message: "access is restricted" });
    }
    
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};
module.exports = auth;


