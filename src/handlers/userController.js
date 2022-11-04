const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const SECRET_KEY = "3edcVGY&"

const userModel = require("../models/users")

const signup = async (req, res)=>{
    const {username, password, email} = req.body;
    try {
        const existingUser = await userModel.findOne({email: email})
        if(existingUser){
            return res.status(400).json({message: "user already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        })
        const token = jwt.sign({email : user.email, id : user._id},SECRET_KEY)
        res.status(201).json({user : user, token: token})
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"something went wrong"})
    }
}

const login = async (req, res)=>{
    const {email, password} = req.body
    try {
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser){
            return res.status(404).json({message: "User does not exist"})
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials"})
        }
        
        const token = jwt.sign({email : existingUser.email, id : existingUser._id},SECRET_KEY)
        res.status(201).json({user : existingUser, token: token})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {signup, login}