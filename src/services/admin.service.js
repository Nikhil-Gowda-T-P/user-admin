const generateAuthToken = require("../middlewares/token");
const bcrypt = require("bcryptjs");
const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const userQuery=require("../queries/user.query")
const adminQuery=require("../queries/admin.query")

const getAllUsers= async() =>{
    try {
        return await adminQuery.getAllUsers();
    }
    catch(error){
        throw error;
    }
}

const editUser = async (id, body) => {
    try {
      const user = await adminQuery.editUser(id, body);
      return user;
    } catch (error) {
      throw error;
    }
  };
        







module.exports={
    getAllUsers,
    editUser
}