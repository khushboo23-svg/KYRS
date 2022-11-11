const mongoose = require("mongoose")
const mongo = require("mongodb")
const userModel = require("../models/users")
const sourcePath = require("../paths/source");
const obj = require("../models/object");

const addShop = async function(req, res, next){
    const userId = req.userId;
    const shopObj = req.body;
    shopObj.products = [];
    const existing_user = await userModel.findOne({_id:userId})
    if(!existing_user.hasOwnProperty("shop")){
        console.log(req.body)
        await userModel.updateOne({_id:userId},{"$set": {"shop":shopObj}},function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
        })
        console.log(shopObj)
        res.redirect("/showShop")
    }
    else{
        res.status(400).json({message:"shop already exists"})
    }
}


const addProduct = async function(req, res, next){
    try
    {
        const userId = req.userId;
        const productObj = req.body;
        const count = await obj.findOne("{id:10}",{count:1})
        await obj.updateOne("{id:10}", {"$set":{count:count+1}})
        productObj.id = count;
        const existing_user = await userModel.findOne({_id:userId})
        if(existing_user.shop.products){
            existing_user.shop.products.push(productObj)
        }
        else{
            existing_user.shop.products = [productObj]
            console.log(existing_user.shop)
        }
        await userModel.updateOne({_id:userId}, {"$set": {shop:existing_user.shop}})
        res.redirect("/userDashboard")
    }
    catch(err){
        console.log(err)
    }
}

const addRentProduct = async function(req, res){
    const userId = req.userId;
    const productObj = req.body;
    const count = await obj.findOne("{id:10}",{count:1})
    await obj.updateOne("{id:10}", {"$set":{count:count+1}})
    productObj.id = count;
    const existing_user = await userModel.findOne({_id:userId})
    if(existing_user){
        existing_user.itemForRent.push(productObj)
    }
    else{
        redirect("/login")
    }
}



module.exports = {addShop, addProduct, addRentProduct}