const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const projectPath = require("./paths/project")

dotenv.config({path: path.join(projectPath(),"config.env")})

const sourcePath = require("./paths/source")

require(sourcePath()+"/database/connection")


const app = express()
const port = process.env.PORT
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.set('view engine','ejs');

app.use(express.static(path.join(sourcePath(), 'public')))
app.use(require(path.join(sourcePath(),'/routes/root')))

app.listen(port, ()=>{
    console.log("Starting server at port", port)
})
