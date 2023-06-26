const express =  require("express")
// const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const User = require("./models/User")
const cors = require("cors")

const app = express()
app.use(express.json())
//app.use(express.urlencoded({extended:true}))

// app.use(bodyParser.json())
app.use(cors())
const port = 3080
require('dotenv').config()


mongoose.connect(process.env.MONGO_CONNECT)
.then(()=>{
    console.log("conntected MONGI");
})

app.post("/login", async (req,res)=>{
    try{
       
        const {email, password} = req.body
        const userDoc = await User.create({email, password})
        res.status(200).json(userDoc)
        console.log(userDoc);
    } catch(e) {
        // if (e.message.includes("E11000 duplicate key error")){
        //     res.status(409).json(e)
        // }
        res.status(400).json(e.message)
        console.log(e.message)
    }
})


app.listen(port, ()=>{
    console.log("server is running");
})



