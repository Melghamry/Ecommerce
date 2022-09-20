const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();
// User regiser
router.post('/register', async (req, res) => {
    try {
        //create user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            isAdmin: req.body.isAdmin,
            password: CryptoJS.AES.encrypt(
                req.body.password, process.env.PASS_SEC
            ).toString()
            

        });
        // save user
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});
// user login
router.post('/login', async (req, res) => {
    try {
        // take usenames from request
        const user = await User.findOne({username: req.body.username });
        // validation
        !user && res.status(403).json("wrong credentials");
        //decrypt password
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            // "Password",
             process.env.PASS_SEC,
        );
        
        const originalPassword= hashedPassword.toString(CryptoJS.enc.Utf8);
        //validation on password
        originalPassword != req.body.password && res.status(401).json("wrong credentials");
        
        // jwt validation
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        
        }, process.env.JWT_SEC,
            { expiresIn: "3d" } 
            );
        //commit yup in object user we separate password from user object and send other properties with spread operator ...
        const { password, ...others } = user._doc;
        // {} in json for that you can send more than object with {}
        res.status(200).json({ others, accessToken }) //[ "username": "rselshall", "password": "123456789"] , id =6325e3decd8d12020bc351f
    } catch (error) {
        res.status(500).json(error);
    }
    
});



module.exports = router;
