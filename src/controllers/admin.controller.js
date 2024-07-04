
const adminServices=require('../services/admin.service')
const statusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const userModel=require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const userService=require('../services/user.service')

const getAllUsers= async(req,res)=>{
    try{
        const result = await adminServices.getAllUsers();
        return response.handleSuccessResponse(
            { successCode: statusCode.SUCCESS_CODE, result },
            res,
            "Users fetched Successfully...",
            "Users fetched Successfully..."
            );
            }catch(error){
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

const editUser = async(req,res)=>{
    try{
        const result = await adminServices.editUser(req.params.id, req.body);
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
    editUser
}