const generateAuthToken = require("../middlewares/token");
const bcrypt = require("bcryptjs");
const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const userQuery=require("../queries/user.query")


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
                `no user found with this email_id`
              );
            }
        const isValidCredentials = await bcrypt.compare(password, user.password);
             if (!isValidCredentials) {
                throw customException.error(
                statusCode.NOT_FOUND,
                "Invalid Credentials",
                "credentials do not represent any user it may be wrong or invalid"
            );
        }
        const token = await generateAuthToken.generateAuthToken(email,user.role);
        return {token,user}
        }catch(error){
            throw error;
        }            
}

const getProfile=async(email)=>{
    try{
        console.log(email)
    const user = await userQuery.finduser(email);
    if(!user){
        throw customException.error(
            statusCode.NOT_FOUND,
            `user Not Found.`,
            `no user found with this token`
          );
        }
        return user;
    }catch(error){
        throw error;
    }
}

module.exports={
    register,
    login,
    getProfile
}   