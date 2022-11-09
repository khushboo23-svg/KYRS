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
            itemRented:[],
            tokens:[]
        })
        user.save()
        res.status(201).json({user : user})
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
        const token = existingUser.generateAuth();
        res.cookie("jwt",token,{
            expires: new Date(Date.now()+3000),
            httpOnly:true
        })
        res.redirect("/userDashboard")
    } catch (error) {
        console.log(error)
    }
}

const logout = function(req, res, next){
    let userTokens = userModel.findOne({_id:req.userId}).tokens
    const index = userTokens.indexOf(req.cookies.jwt)
    const tokens = userTokens.tokens.slice(index,1)
    userModel.updateOne({_id:req.userId},{$set: {tokens:tokens}})
    res.render(sourcePath()+"/views/index")
}

module.exports = {signup, login, logout}