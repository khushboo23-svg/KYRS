const jwt = require("jsonwebtoken");
const userModel = require("../models/users")

const auth = (req,res,next)=>{
    const token = req.cookies.jwt;
    console.log("token2:"+token)
    try{
        let user = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = user._id
        next()
    }
    catch(err){
        console.log(err)
    }
    return
}

const checkIfLoggedIn = async function(req, res, next){
    try{
        console.log("cookies:"+req.cookies.jwt);
    const user = await jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)
    console.log(user)
    console.log("redirected to user dashboard")
    res.redirect("/userDashboard")
    }
    catch(err){
    next()
    }
}

module.exports = {auth, checkIfLoggedIn}