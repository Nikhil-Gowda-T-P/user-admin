const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        console.log(authHeader)
      return res.status(401).send("Please provide an Authorization header...");
    } 
    const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
    console.log(decoded)
    if(decoded.role=="admin" ||  decoded.role=="user"){
        req.email=decoded.email
        next();
    }
    else{
        res.status(400).json({ status: false, message: "access is restricted" });
    }
    
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};
module.exports = userAuth;


