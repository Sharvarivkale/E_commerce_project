const { text } = require("express");
const usermodel=require("../models/usermodel");
const { hashpassword, comparepassword } = require("../utiles/auth.utiles");
const jwt=require("jsonwebtoken")

// registeration
async function registerController(req,res){

  //check whether all fields are occupy or not 
  try {
    const {email,password,name,address,phone,role}=req.body;

    if(!email || !password ||!name ||!address || !phone){
      return(
        res.status(400).send({
          message:"all fields are required"
        })
      )
    }
    // checks whether the user are already exit or not
    const exitinguser=await usermodel.findOne({email})
    if(exitinguser){
      return (res.status(400).send({
          message:"you are already registered,now time for the login"
        }))
    }
  // hashpassword 
    const hashedpassword=await hashpassword(password);
    //save the register user to the db
    const user= new usermodel({
      email,
      password:hashedpassword,
      name,
      phone,
      address,
      role
    })

    await user.save()
   
    //now msg send for successful login
    return res.status(201).send({
      success:true,
      message:"registered successful",
      user
    })
    
  } 
  catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"register error",
      error
    })
    
  }
}

//login
async function loginController(req,res){
  try {
   // fetch the data
    const {email,password}=req.body;

    if(!email || !password){
      return res.status(404).send({
        success:false,
        message:"all fields are required to filled"
      })
    }

    //check user registered yet or not
    const user=await usermodel.findOne({email})
    if(!user){
      return(
        res.status(404).send({
          success:false,
          message:"user need to registerd first"
        })
      )
    }

    //check the password are match or not
    const match=await comparepassword(password,user.password);
    if(!match){
      res.status(404).send({
        success:false,
        message:"password or email are wrong"
      })
    }
    //token creation

    const token=jwt.sign({_id:user._id},process.env.JWT_SECRECT,{expiresIn:'7d'})
    return res.status(201).send({
      success:true,
      message:"login successfull",
      token,
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        role:user.role
      }
    })

    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"failed to the login",
      error
    })
  }
}

// test
async function textController(req,res){
 return res.send("proteted routes")
}
module.exports={registerController,loginController,textController}