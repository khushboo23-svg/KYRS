const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE, (err)=>{
    if(err)
        console.log(err)
    else{
        console.log("connected")
    }
})