const express = require("express");
const userRoute = require ("./routes/user.route");
const signupRoute = require ("./routes/signup.route");
const loginRoute = require ("./routes/login.route");
const servicesRoute = require ("./routes/services.route");
const transactionRoute = require ("./routes/transaction.route");
const accountRoute = require ("./routes/account.route");
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
app.use("/", signupRoute);
app.use("/", loginRoute);
app.use("/", transactionRoute);
app.use("/", servicesRoute)
app.use("/", accountRoute);
app.use(error);

app.listen(3000, ()=>{
    console.log("Now listening to port 3000");
});