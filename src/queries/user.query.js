const {userModel}=require("../models/user.model");

const register=async(body,session) =>{
    try{
        return await new userModel(body).save(session);
        }catch(error){
        throw error;
        }

}

const finduser = async(email) =>{
    try{
        return await userModel.findOne({email:email});
        }catch(error){
            throw error;
        }
}

module.exports ={
    register,
    finduser
}
