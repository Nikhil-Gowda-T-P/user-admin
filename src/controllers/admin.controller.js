
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

/**
 * @swagger
 * tags:
 *   name: Admin Services
 *   description: User management APIs
 *
 * /view-users:
 *   get:
 *     summary: Get All Users
 *     description: Use this API to fetch all users
 *     tags:
 *       - Admin Services
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token for Authentication.
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Users fetched successfully
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
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 60d21b4667d0d8992e610c85
 *                           name:
 *                             type: string
 *                             example: John Doe
 *                           email:
 *                             type: string
 *                             example: johndoe@example.com
 *                           role:
 *                             type: string
 *                             example: user
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: Users fetched successfully
 *                 displayMessage:
 *                   type: string
 *                   example: Users fetched successfully
 *                 status:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *         
 *       500:
 *         description: Internal server error
 *         
 */



module.exports={
    getAllUsers,
    editUser
}