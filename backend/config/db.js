const mongoose=require("mongoose")

async function connectiontodb(){
  return(
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
      console.log("connected to the db")
    })
  )
}

module.exports=connectiontodb