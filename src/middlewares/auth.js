const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const jwt = req.cookies.jwt;
    let user = jwt.verify(token, process.env.SECRET_KEY)
    userModel.findOne({_id:user._id}, (err,docs)=>{
        if(err){
            console.log(err)
            res.render("../views/login")
        }
        else{
            if(req.cookies.jwt in docs.tokens){
                req.userId = user._id
                next()
            }
            else{
                res.render("../view/login")
            }
        }
    })
    return
}

module.exports = {auth}