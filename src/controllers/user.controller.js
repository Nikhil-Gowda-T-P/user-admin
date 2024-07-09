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
        const result = await userService.forgotPassword(req,req.body);
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


const resetPassword= async(req,res) =>{
    try{
        console.log("in controllers")
        const result = await userService.resetPassword(req);
        return response.handleSuccessResponse(
            { successCode: statusCode.SUCCESS_CODE, result },
            res,
            "Password Reset Successful",
            "Password Reset Successful"
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



/**
 * @swagger
 * tags:
 *   name: User Services
 *   description: User service APIs
 *
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Use this API to register a new user
 *     tags:
 *       - User Services
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: Password123!
 *               role:
 *                 type: string
 *                 description: role of the user default:user
 *                 example: admin
 *     responses:
 *       200:
 *         description: Successful response indicating the registration of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 200
 *                 customStatusCode:
 *                   type: integer
 *                   nullable: true
 *                 result:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *                         role:
 *                           type: string
 *                           example: user
 *                       nullable: true
 *                     customData:
 *                       type: object
 *                       nullable: true
 *                 message:
 *                   type: string
 *                   example: Register Successful...
 *                 displayMessage:
 *                   type: string
 *                   example: Register Successful...
 *                 status:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request (e.g., validation error, passwords do not match)
 *         
 *       409:
 *         description: Conflict (e.g., email already exists)
 *         
 *       500:
 *         description: Internal server error
 *         
 */

/**
 * @swagger
 * tags:
 *   name: User Services
 *   description: User service APIs
 *
 * /login:
 *   post:
 *     summary: User Login
 *     description: Use this API to log in a user
 *     tags:
 *       - User Services
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Successful response indicating the login of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 200
 *                 customStatusCode:
 *                   type: integer
 *                   nullable: true
 *                 result:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: your_jwt_token_here
 *                     user:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *                         role:
 *                           type: string
 *                           example: user
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: Login Successful...
 *                 displayMessage:
 *                   type: string
 *                   example: Login Successful...
 *                 status:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request (e.g., validation error)
 *         
 *       404:
 *         description: Not found (e.g., user not found, invalid credentials)
 *         
 *       500:
 *         description: Internal server error
 *        
 */
/**
 * @swagger
 * tags:
 *   name: User Services
 *   description: User service APIs
 *
 * /forgot-password:
 *   post:
 *     summary: User Forgot Password
 *     description: Use this API to request a password reset link
 *     tags:
 *       - User Services
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user requesting the password reset
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 200
 *                 customStatusCode:
 *                   type: integer
 *                   nullable: true
 *                 result:
 *                   type: object
 *                   properties:
 *                     successCode:
 *                       type: integer
 *                       example: 200
 *                     result:
 *                       type: string
 *                       example: Email sent successfully
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: Password Reset Link Sent to your Email
 *                 displayMessage:
 *                   type: string
 *                   example: Password Reset Link Sent to your Email
 *                 status:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: User not found
 *         
 *       500:
 *         description: Internal server error
 *         
 */
/**
 * @swagger
 * tags:
 *   name: User Services
 *   description: User service APIs
 *
 * /reset-password:
 *   post:
 *     summary: User Password Reset
 *     description: Use this API to reset your password
 *     tags:
 *       - User Services
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user resetting the password
 *                 example: johndoe@example.com
 *               newPassword:
 *                 type: string
 *                 description: The new password
 *                 example: newPassword123
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the new password
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 200
 *                 customStatusCode:
 *                   type: integer
 *                   nullable: true
 *                 result:
 *                   type: object
 *                   properties:
 *                     successCode:
 *                       type: integer
 *                       example: 200
 *                     result:
 *                       type: string
 *                       example: Password reset successfully
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: Password Reset Successful
 *                 displayMessage:
 *                   type: string
 *                   example: Password Reset Successful
 *                 status:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Passwords do not match
 *        
 *       404:
 *         description: User not found
 *         
 *       500:
 *         description: Internal server error
 *         
 */


module.exports={
    register,
    login,
    forgotPassword,
    resetPassword

}