const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

app = express()
mongoose.connect("mongodb://localhost:27017/smitDB",{useNewUrlParser: true},(err)=>{
    if(err)
        console.log(err)
    else
        console.log("connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model("user", userSchema)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname));

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})

app.post("/login",(req, res)=>{
    User.find((err, users)=>{
        if(err){
            console.log(err)
        }else{
            console.log(users)
        }
    })
    res.redirect("/")
})

app.get("/signup",(req,res)=>{
    res.sendFile(__dirname+"\\signup.html")
})

app.post("/signup",(req,res)=>{
    User.find({email: req.body.email},(err,response)=>{
        if(err)
            console.log(err)
        else{
            if(response.length==0){
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                user.save((err,result)=>{
                    if (err){
                        console.log(err)
                    }else{
                        console.log(result)
                    }
                })    
                res.redirect("/login")
            }
            else{
                console.log("User already exists")
            }
        }
    })
})

app.listen(3000,()=>{
    console.log("app is listening on port 3000")
})