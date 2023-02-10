const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send('Hello world from the server router js');
});

// Async-Await

router.post('/signup', async (req, res) => {

    const { name, email, phone, work, password, cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill the field properly" });
    }

    try{

        const userExist = await User.findOne({ email: email});

        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        }else if(password != cpassword){
            return res.status(422).json({ error: "Password is not matching" });
        }else{
            const user = new User({name, email, phone, work, password, cpassword});

            await user.save();

            res.status(201).json({message: "User registered successfully"});
        }

        
        

    } catch(err) {
        console.log(err);
    }

});

//login route

router.post('/login', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({error:"Please fill the data properly"})
        }

        const userLogin = await User.findOne({ email: email });

        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
        
            // need to generate the token and stored cookie after the password match
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credentials pass"});
        } else {
            res.json({ message: "User signin successfully"});
        }

        } else {
            res.status(400).json({ error: "Invalid Credentials"});
        }

        
        
    } catch (err) {
        console.log(err);
    }
});

// about us page

router.get('/about', authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});

// get user data for contact us and home page
router.get('/getdata', authenticate, (req, res) => {
    console.log(`Get Data`);
    res.send(req.rootUser);  
});

// contact us page
router.post('/contact', authenticate, async (req, res) => {
    try {
        const {name, email, phone, message} = req.body;

        if (!name || !email || !phone || !message) {
            console.log("Error in Contact Form");
            return res.json({ error: "Please fill the contact form"});
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "User Contact Successfully" });
        }
    } catch (error) {
        console.log(error);
    }
});

// logout page

router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', { path:'/' });
    res.status(200).send('User Logout');
});


module.exports = router;
