const generateAuthToken = require("../middlewares/token");
const bcrypt = require("bcryptjs");
const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const userQuery=require("../queries/user.query")
const sendEmail=require('../../commons/utils/email')
const jwt = require("jsonwebtoken");

const register=async(body,session)=>{
    try{
        const {name,email,password,}=body;
        const hashedPassword= await bcrypt.hash(password,10);
        const bodyWithHashedPassword = {
            ...body,
            password: hashedPassword,
          };
          return await userQuery.register(bodyWithHashedPassword, session);
    }catch(error){
        throw error;
    }    
}

const login = async({email,password}) =>{
    try{
        const user = await userQuery.finduser(email);
        if(!user){
            throw customException.error(
                statusCode.NOT_FOUND,
                `user Not Found.`,
                `user Not Found.`
              );
            }
        const isValidCredentials = await bcrypt.compare(password, user.password);
             if (!isValidCredentials) {
                throw customException.error(
                statusCode.NOT_FOUND,
                "Invalid Credentials",
                "Invalid Credentials"
            );
        }
        const token = await generateAuthToken.generateAuthToken(email,user.role);
        return {token,user}
        }catch(error){
            throw error;
        }
            

}
const forgotPassword=async(req,{email}) =>{
    try{
        const user = await userQuery.finduser(email);
        if(!user){
            throw customException.error(
                statusCode.NOT_FOUND,
                `user Not Found.`,
                `user Not Found.`
                );
        }

        const token = await generateAuthToken.generateAuthToken(email,user.role);
       
       

        const resetUrl = `http://${req.headers.host}/api/reset-password?token=${token}`;
        const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;
        const res= await sendEmail(user.email, 'Password Reset', message);
        return res
        }
        catch(error){
            throw error;
     }


}

const resetPassword=async(req) =>{
    try{
        console.log(req.body)
        const { token, newPassword, confirmPassword } = req.body;
        console.log(token)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userQuery.finduser(decoded.email);
        //const user = await userQuery.finduser(email)
        if(!user){
            throw customException.error(
                statusCode.NOT_FOUND,
                `user Not Found.`
                );
        }
        if(newPassword!==confirmPassword){
            throw customException.error(
                statusCode.BAD_REQUEST,
                `Password and Confirm Password does not match.`
                );
        }
        const hashedPassword= await bcrypt.hash(newPassword,10); 
        console.log(user._id)   
        const updatedUser = await userQuery.updatePassword(user._id,hashedPassword);
        return updatedUser

        }catch(error){
            throw error;
        }


}


module.exports={
    register,
    login,
    forgotPassword,
    resetPassword
}   