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

const editUser = async(id, body)=>{
    try {
        return await userModel.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
        throw error;
    }
}
module.exports={
    getAllUsers,
    editUser
}