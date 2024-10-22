
const adminServices=require('../services/admin.service')
const statusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");

const getAllUsers= async(req,res)=>{
    try{
        const result = await adminServices.getAllUsers();
        return response.handleSuccessResponse(
            { successCode: statusCode.SUCCESS_CODE, result },
            res,
            "Users fetched Successfully...",
            "Users retrieved Successfully from the database"
        );
    }catch(error){
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        return response.handleErrorResponse(
            { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
            );            
    } 
}

const deleteUser = async(req,res)=>{
    try{
        const result = await adminServices.deleteUser(req.params.id);
        return response.handleSuccessResponse(
            { successCode: statusCode.SUCCESS_CODE, result },
            res,
            "User Updated Successfully...",
            "User Updated Successfully..."
            );
    }
    catch(error){
        console.log(error)
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        return response.handleErrorResponse(
            { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
        }
}
module.exports={

    getAllUsers,
    deleteUser
}