const statusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");

const userModel=require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const userService=require('../services/user.service')

const register=async(req,res)=>{
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const result = await userService.register(req.body, session);
        await session.commitTransaction();
        return response.handleSuccessResponse(
            { successCode: statusCode.SUCCESS_CODE, result },
            res,
            "Register Successful...",
            "Register Successful..."
          );
    } catch (error) {
        await session.abortTransaction();
        if (error.code === 11000) {
          return response.handleErrorResponse(
            {
              errorCode: statusCode.DATA_ALREADY_EXISTS,
              message: error.errmsg,
              displayMessage: `${
                error.keyValue[Object.keys(error.keyValue)[0]]
              } already exists`,
            },
            res
          );
        }
        return response.handleErrorResponse(
          { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
          res
        );
      } finally {
        session.endSession();
      }
        

}

const login = async(req,res) => {
   try{
    const result = await userService.login(req.body);
    return response.handleSuccessResponse(
        { successCode: statusCode.SUCCESS_CODE, result },
        res,
        "Login Successful...",
        "Login Successful..."
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

const forgotPassword= async(req,res) => {
    try{
        const result = await userService.forgotPassword(req.body);
        return response.handleSuccessResponse(
            { successCode: statusCode.SUCCESS_CODE, result },
            res,
            "Password Reset Link Sent to your Email",
            "Password Reset Link Sent to your Email"
            );
            }catch(error){
                if (error.errorCode) {
                    return response.handleErrorResponse(error , res);
                    }
                return response.handleErrorResponse(
                    { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
                    res
                    );
            }
}

module.exports={
    register,
    login,
    forgotPassword

}