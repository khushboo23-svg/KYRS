const mongoose = require("mongoose")
const userModel = require("../models/users")
const sourcePath = require("../paths/source");

const particularShop = async function(req, res){
    const _id = req.params.id;
    const obj = await userModel.findOne({_id:_id})
    res.render(sourcePath()+"/views/particularShop", obj.shop)
}


const rent = async function(req, res){
    const _id = req.params.id;
    const user = await userModel.findOne({_id:_id})
    res.render(sourcePath()+"/views/rent",user.itemForRent)
}

const buy = async function(req, res){
    const _id = req.params.id;
    const user = await userModel.findOne({_id:_id})
    res.render(sourcePath()+"/views/buy",user.shop.products)
}

const showShop = async function(req, res){
    const allShops = await userModel.find({},
        { shop : 1, _id:1}
      )
    let shops = []
    allShops.forEach((val)=>{
        if(val.shop){
            let shop = val.shop
            delete shop.products
            shop._id = val._id
            shops.push(shop)
    }})
    console.log(shops)
    res.render(sourcePath()+"/views/showShop",shops)
}


module.exports = {particularShop, rent, buy, showShop}