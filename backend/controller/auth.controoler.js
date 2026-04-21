const { text } = require("express");
const usermodel=require("../models/usermodel");
const { hashpassword, comparepassword } = require("../utiles/auth.utiles");
const jwt=require("jsonwebtoken")

// registeration
async function registerController(req,res){

  try {
    const {email,password,name,address,phone,role,answer}=req.body;

    if(!email || !password ||!name ||!address || !phone || !answer){
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
      answer, 
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

async function forgotPasswordController(req,res){
  const {email,answer,newpassword}=req.body;

  if(!email || !answer || !newpassword){
    return res.status(400).send({
      success:false,
      message:"all fields are required"
    })
  }

  // check if user exists
  const user=await usermodel.findOne({email})
  if(!user){
    return res.status(404).send({
      success:false,
      message:"user not found"
    })
  }

  // check if security answer is correct
  if(user.answer !== answer){
    return res.status(400).send({
      success:false,
      message:"invalid security answer"
    })
  }

  // update password
  user.password=await hashpassword(newpassword)
  await user.save()

  return res.status(200).send({
    success:true,
    message:"password reset successful"
  })
}

// test
async function textController(req,res){
 return res.send("proteted routes")
}
// update profile
async function updateProfileController(req, res) {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await usermodel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passowrd is required and 6 character long" });
    }
    const hashedPassword = password ? await hashpassword(password) : undefined;
    const updatedUser = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
}

module.exports={registerController,loginController,textController,forgotPasswordController,updateProfileController}