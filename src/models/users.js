const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    cart : {
        type: Array,
        required: true
    },
    shop : {
        type: Object,
        required: true
    },
    bought: {
        type: Array,
        required: true
    },
    itemForRent:{
        type: Array,
        required:true
    },
    itemRented:{
        type:Array,
        required:true
    },
    tokens:{
        type:Array,
        required:true
    }
})


userSchema.pre('save',async function(next){
    console.log("hello")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10) 
    }
    next();
})

userSchema.methods.generateAuth = async function(){
    try {
        const token = jwt.sign({_id: this.id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    } catch (error) {
        console.log(error)
    }
}
const User = mongoose.model("user", userSchema);

module.exports = User;