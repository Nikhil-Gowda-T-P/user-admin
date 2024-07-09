const express = require("express");
const router = express.Router();
const userController=require("../controllers/user.controller")
const adminController=require("../controllers/admin.controller.js")
const auth=require("../middlewares/auth.js")
const path=require("path")

router.post("/register",userController.register);
router.post("/login",userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

router.get('/view-users', auth, adminController.getAllUsers);
router.put('/edit-user/:id', auth,  adminController.editUser);

router.get('/reset-password', (req, res) => {
    console.log("in routers")
    res.sendFile(path.join(__dirname, '../../public/reset-password.html')); 
  });



module.exports = router;