const express = require("express")
const sourcePath = require("../paths/source")
const { signup, login, logout } = require("../handlers/userController")
const {addShop, addProduct} = require("../handlers/appController")
const rootRoute = express.Router()
const {auth} = require("../middlewares/auth")
rootRoute.get("/",(req,res)=>{
    res.render(sourcePath()+'/views/index',{title:'Fill Form',password:'',email:''});
})

rootRoute.get("/login", (req,res)=>{
    dir = sourcePath();
    res.render(dir+"/views/login")
})

rootRoute.get("/signup", (req, res)=>{
    dir = sourcePath()
    res.render(dir+"/views/signup")
})

rootRoute.get("/userDashboard",auth, async (req, res, next)=>{
    const existingUser = await userModel.findOne({_id: req.userId});
    res.render(sourcePath()+"/views/userDashboard", {name:existingUser.name})
})

rootRoute.get("/addShop", auth, (req,res)=>{
    res.render(sourcePath()+"/views/addShop")
})

rootRoute.get("/addProduct",auth,(req,res)=>{
    res.render(sourcePath+"/views/addProduct")
})

rootRoute.post("/signup",signup)

rootRoute.post("/login",login)

rootRoute.get("/logout",auth,logout)

rootRoute.post("/addShop",auth,addShop)

rootRoute.post("/addProduct",auth,addProduct)

rootRoute

module.exports = rootRoute