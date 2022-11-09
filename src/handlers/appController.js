const mongoose = require("mongoose")
const userModel = require("../models/users")
const sourcePath = require("../paths/source")

const addShop = async function(req, res, next){
    const userId = req.userId;
    const existing_user = userModel.findOne({_id:userId})
    if(existing_user=={}){
        console.log(req.body)
        userModel.updateOne({_id:userId},{"$set": {shop:req.body}})
    }
    else{
        res.status(400).json({message:"shop already exists"})
    }
}

const addProduct = async function(req, res, next){
    
}

module.exports = {addShop, addProduct}