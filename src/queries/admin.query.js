const {userModel}=require("../models/user.model");

const getAllUsers = async()=>{
    try{
        const users=await userModel.find().select('-password');
        return users;
    }
    catch(err){
        throw err;
        }
}

const deleteUser = async(id)=>{
    try {
        const user=await userModel.findByIdAndDelete(id);
        return user;
    } catch (error) {
        throw error;
    }
}
module.exports={
    getAllUsers,
    deleteUser
}

