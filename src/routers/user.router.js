const express = require("express");
const router = express.Router();
const userController=require("../controllers/user.controller")
const adminController=require("../controllers/admin.controller.js")
const auth=require("../middlewares/auth.js")

router.post("/register",userController.register);
router.post("/login",userController.login);
router.post('/forgot-password', userController.forgotPassword);

router.get('/view-users', auth, adminController.getAllUsers);
router.put('/edit-user/:id', auth,  adminController.editUser);


module.exports = router;