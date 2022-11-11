const jwt = require("jsonwebtoken");
const userModel = require("../models/users")

const auth = async function(req,res,next){
    const token = req.cookies.jwt;
    console.log("token2:"+token)
    try{
        let user = jwt.verify(token, process.env.SECRET_KEY)
        const existing_user = await userModel.findOne({_id:user._id})
        if(existing_user){
        req.userId = user._id
        next()}
        else{
            res.cookie("jwt",undefined,{
                httpOnly:true
            })
            res.redirect("/login")
        }
    }
    catch(err){
        console.log(err)
    }
    return
}

const checkIfLoggedIn = async function(req, res, next){
    try{
        const user = await jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)
        res.redirect("/userDashboard")
    }
    catch(err){
        next()
    }
}

const checkShop = async function(req,res,next){
    try{
        const user = userModel.findOne({_id: req.userId})
        if(user.shop=={}){
            res.redirect("/shop")
        }
        else
            next()
    }
    catch(err){
        res.redirect("/login")
    }
}

const shopRegistered = async function(req, res, next){
    const _id = req.userId;
    const user = await userModel.findOne({_id:_id})
    if(user){
        if(user.shop){
            res.redirect("/addProduct")
        }
        else
            next()
    }
    else
        res.render("/login")
}

module.exports = {auth, checkIfLoggedIn,checkShop,shopRegistered}