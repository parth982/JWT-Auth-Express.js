// Check Username and Password in POST Login Request.
// If Both fields are present in req.body then we create JWT.
// After Creating JWT we send it back to Front-end so that user can make GET Request with that JWT.
// So when a client has JWT Token then only he is allowed to make GET Request and access secret data.

const {BadRequestError} = require('../errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req,res) =>{
    const {username, password} = req.body;
    // Checking the value of Username & password before providing JWT. 
    // O1) Mongoose Validation using Schema
    // O2) Validation layer infront of all Requests using Package Joi
    // O3) Checking them right over here in the  controller.

    if(!username || !password){
        throw new BadRequestError('Provide Both Username & Password it is Mandatory');
    }

    // For demo as ID normally Provided by DB
    const id = new Date().getDate();

    // Generate JWT by sign(p1,p2,p3), p1 contains payload of the token we try to keep Payload smaller for better user experience. p2 contains Secret Access Key that will be only presenet on server used to sign Token on basis of user. Here p3 is used to includes options.
    const token  =jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'});

    // Here we are sending the JWT Token to User. The time he will send Request with JWT Token in backend we will Decode the Token and get to know the Username and other details specified in Payload.
    res.status(200).json({msg:'User Created',token});
};

const dashboard = async (req,res) =>{
    const LuckyNum = Math.floor(Math.random()*100);

    res.status(200).json({
        msg:`Hello ,${req.user.username}`,
        secret: `Your Auth Data is ${LuckyNum}`
    });
};

module.exports = {login,dashboard};