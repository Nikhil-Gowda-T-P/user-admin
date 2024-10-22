const express = require("express");
const router = express.Router();
const userController=require("../controllers/user.controller")
const adminController=require("../controllers/admin.controller.js")
const auth=require("../middlewares/auth.js")
const path=require("path");
const userAuth = require("../middlewares/userAuth.js");


router.post("/register",userController.register);
router.post("/login",userController.login);

router.get('/users', auth, adminController.getAllUsers);
router.delete('/delete/:id', auth,  adminController.deleteUser);

router.get('/profile',userAuth,userController.getProfile)


module.exports = router;