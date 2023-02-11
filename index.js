const express = require("express");
require("dotenv").config()

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/userDBMongoose")  //"mongodb://127.0.0.1/userDBMongoose"
mongoose.set('strictQuery', false)

const app = express();

const cors = require("cors")
app.use(cors());

const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());

const registerRoute = require('./Routes/register')
const loginRoute = require('./Routes/login')
const listRoute = require('./Routes/list')
const Authentication = require('./middleware/auth')

app.use("/", registerRoute)
app.use("/", loginRoute)
app.use("/", listRoute)


    app.get("*" , (req , res)=> {
        res.status(404).send("API not found")
    })


app.listen(5000 , ()=> {
    console.log("The server is up at port 5000");
})