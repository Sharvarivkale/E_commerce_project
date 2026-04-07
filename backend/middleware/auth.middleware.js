const jwt=require("jsonwebtoken")
const usermodel =require("../models/usermodel")

async function requiresignIn(req,res,next){
 try {
   const decode=jwt.verify(req.headers.authorization,process.env.JWT_SECRECT)
   req.user=decode;
   next();
   
 } catch (error) {
   res.status(404).send({
    success:false,
    message:"token are not match"
   })
 }
}

async function isadmin(req,res,next){
  try {
    const user=await usermodel.findById(req.user._id)
    if(user.role!==1){
      return res.status(404).send({
        success:false,
        message:"unauthorize admin",
        
      })
    }
    else(
      next()
    )
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:"admin dashboard internal error",
      error
    })
  }
}

module.exports={requiresignIn,isadmin}