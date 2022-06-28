const express = require("express");
const userRoute = require ("./routes/users.route");
const cors = require('cors');
const error = require("./middleware/error.middleware");


require('dotenv').config({ path: './env/.dev.env' });
const app = express();


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/", (req,res)=>{
    res.send("Hello world!");
});

//-----------------------------------------------
app.use("/", userRoute);

app.use(error);

app.listen(3000, ()=>{
    console.log("Now listening to port 3000");
});