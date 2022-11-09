const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userModel = require("../models/users")
const sourcePath = require("../paths/source")

const signup = async (req, res)=>{
    console.log(req.body)
    const {name, email, password, cpassword} = req.body;
    if(!name||!password||!email){
        res.render(sourcePath()+"/views/signup")
        return
    }
    try {
        const existingUser = await userModel.findOne({email: email})
        if(existingUser){
            return res.status(400).json({message: "user already exists"})
        }              
        const user = new userModel({
            email: email,
            password: password,
            name: name,
            cart:[],
            shop:{},
            bought:[],
            itemForRent:[],
            itemRented:[]
        })
        user.save()
        res.redirect("/login")
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"something went wrong"})
    }
}

const login = async (req, res)=>{
    console.log(req.body)
    const {email, password} = req.body
    try {
        console.log(email)
        console.log(password)
        if(!email||!password){
            res.status(400).json("Fill the data correctly")
            return
        }
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser){
            return res.status(404).json({message: "Invalid Credentials"})
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials"})
        }
        const token = jwt.sign({_id: existingUser._id}, process.env.SECRET_KEY)
        console.log("hi")
        console.log(token)
        res.cookie("jwt",token,{
            httpOnly:true
        })
        res.redirect("/userDashboard")
    } catch (error) {
        console.log(error)
    }
}

const logout = function(req, res, next){
    res.cookie("jwt",undefined,{
        httpOnly:true
    })
    res.render(sourcePath()+"/views/index")
}

module.exports = {signup, login, logout}