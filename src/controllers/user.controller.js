const statusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
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
            "Registration Successful...",
            "Registration succesful..."
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
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        return response.handleErrorResponse(
            { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
                
    } 
}

const getProfile=async(req,res)=>{
  try{
    const profile=await userService.getProfile(req.email);
    return response.handleSuccessResponse(
      { successCode: statusCode.SUCCESS_CODE, profile },
      res,
      "profile fetched succesfully",
      "profile of logged in user fetched succesfully"
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
module.exports={
  register,
  login,
  getProfile
}