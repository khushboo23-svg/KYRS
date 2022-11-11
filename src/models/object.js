const mongoose = require("mongoose")
const object = mongoose.Schema({
    count: {
        type: int,
        required: true
    },
    id:{
        type:int,
        required:true
    }
})

const obj = mongoose.model("object", object);

const obj1 = new obj({count:0,id:10})
obj1.save()

module.exports = obj;