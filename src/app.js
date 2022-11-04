const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const sourcePath = require("./paths/source")

const userRouter = require("./routes/userRoutes")

const app = express()

const port = process.env.PORT || 3000


app.use(express.json())
dir = sourcePath()
console.log(dir)
app.use(express.static(path.join(dir, 'stylesheets')))
app.use("/user", userRouter)

app.get("/",(req, res)=>{
    res.send("Hello")
})
mongoose.connect("mongodb+srv://alpha:alpha@cluster0.svlsxcs.mongodb.net/?retryWrites=true&w=majority", (err)=>{
    if(err)
        console.log(err)
    else{
        console.log("connected")
    }
})

app.listen(port, ()=>{
    console.log("Starting server at port", port)
})