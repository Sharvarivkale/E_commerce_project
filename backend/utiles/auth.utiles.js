const bcrypt=require("bcrypt")

async function hashpassword(password){
  try {
    const rounds=10;
    const hashedpassword=await bcrypt.hash(password,rounds)
    return hashedpassword 
  }
   catch (error) {
    console.log(error)
  }
}

async function comparepassword(password,hashedpassword){
 return await bcrypt.compare(password,hashedpassword)
}

module.exports={hashpassword,comparepassword}