const express = require("express")
const sourcePath = require("../paths/source")
const { signup, login, logout } = require("../handlers/userController")
const {addShop, addProduct, addRentProduct} = require("../handlers/appController")
const rootRoute = express.Router()
const {auth, checkIfLoggedIn, checkShop, shopRegistered} = require("../middlewares/auth")
const {particularShop ,rent, buy, showShop} = require("../handlers/appGetController")
const userModel = require("../models/users")
rootRoute.get("/",(req,res)=>{
    res.render(sourcePath()+'/views/index',{title:'Fill Form',password:'',email:''});
})

rootRoute.get("/login",  checkIfLoggedIn, (req,res)=>{
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

rootRoute.get("/addShop", auth, shopRegistered, (req,res)=>{
    res.render(sourcePath()+"/views/addShop")
})

rootRoute.get("/addProduct",auth,checkShop,(req,res)=>{
    res.render(sourcePath()+"/views/addProducts")
})

rootRoute.get("/particularShop/:id",(req,res)=>{
    res.render(sourcePath()+"/views/showShop")
})

rootRoute.get("/showShop", showShop)

rootRoute.get("/buy",(req, res)=>{
    res.render(sourcePath()+"/views/buy")
})

rootRoute.get("/rent",(req, res)=>{
})

rootRoute.get("/rented", (req,res)=>{
    
})


rootRoute.post("/signup",signup)

rootRoute.post("/login",login)

rootRoute.get("/logout",auth,logout)

rootRoute.post("/addShop",auth,addShop)

rootRoute.post("/addProduct",auth,addProduct)

module.exports = rootRoute