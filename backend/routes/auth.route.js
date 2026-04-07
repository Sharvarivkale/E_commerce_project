const express=require("express")
const router=express.Router()
const {registerController,loginController, textController}=require("../controller/auth.controoler")
const {requiresignIn,isadmin} =require("../middleware/auth.middleware")

router.post('/register',registerController)
router.post("/login",loginController)
router.get("/text",requiresignIn,isadmin,textController)

module.exports=router