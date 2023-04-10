const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const authenticationMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    // If No Token Provided with Request
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No Token Provided');
    }
    // Verify if Send Token in req header matched JWT Token we provided while creation of User 
    const token = authHeader.split(' ')[1];
    // Here decode will contain data of payload which is Username, id through which token was signed/created.
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {id, username} = decoded;
        req.user = {id, username};
        next();
    }catch(error){
        throw new UnauthenticatedError('Not Authorized to Access this Route');
    }
};
module.exports = authenticationMiddleware;