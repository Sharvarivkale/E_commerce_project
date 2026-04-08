const express=require("express")
const router=express.Router()
const {registerController,loginController, textController,forgotPasswordController}=require("../controller/auth.controoler")
const {requiresignIn,isadmin} =require("../middleware/auth.middleware")

router.post('/register',registerController)
router.post("/login",loginController)
router.post("/forgot_password",forgotPasswordController)
router.get("/text",requiresignIn,isadmin,textController)
router.get('/user_auth',requiresignIn,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})

module.exports=router