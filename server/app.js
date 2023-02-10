const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

dotenv.config({ path: './config.env'});
require('./db/conn');
const User = require('./model/userSchema');

app.use(express.json());


// we link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;


//Middleware

//const middleware = (req,res, next) => {
  //  console.log(`Hello my Middleware`);
   // next();
// }

// app.get('/', (req, res) => {
    // res.send('Hello world from the server app.js');
// });

//app.get('/about', middleware, (req, res) => {
  //  console.log(`Hello my About`);
    //res.send('About');
//});

// app.get('/contact', (req, res) => {
//    res.send('Contact');
//});

app.get('/signup', (req, res) => {
    res.send('Registration');
});

app.get('/login', (req, res) => {
    res.send('Login');
});


app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})