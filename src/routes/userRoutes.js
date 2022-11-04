const express = require("express")
const { signup, login } = require("../handlers/userController")
const sourcePath = require("../paths/source")
const userRouter = express.Router()

userRouter.get("/",(req,res)=>{
    res.redirect("/user/login")
})

userRouter.get("/login", (req,res)=>{
    dir = sourcePath();
    res.sendFile(dir+"\\webpages\\login.html")
})

userRouter.get("/signup", (req, res)=>{
    dir = sourcePath()
    res.sendFile(dir+"/webpages/signup.html")
})

userRouter.post("/signup",signup)

userRouter.post("/login",login)

module.exports = userRouter;