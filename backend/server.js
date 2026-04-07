const express=require("express")
const dotenv=require("dotenv")
const connectiontodb=require("./config/db")
const authroutes=require("./routes/auth.route")
const cors=require("cors")
dotenv.config()
connectiontodb()
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
  res.send("<h1>hii wlc to my project</h1>")
})

app.use('/auth',authroutes)

const port=process.env.PORT || 8080

app.listen(port,()=>{
  console.log(`listening to the port ${port}`)
})