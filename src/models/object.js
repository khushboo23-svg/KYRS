const mongoose = require("mongoose")
const object = mongoose.Schema({
    count: {
        type: int,
        required: true
    }
})

const objest = mongoose.model("user", userSchema);

module.exports = User;