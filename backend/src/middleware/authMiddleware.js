const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UserRepository');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            const error = new Error('No Token provided');
            error.status = 401;
            throw error;
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userRepository.findById(decoded.id);
        if(!user){
            const error = new Error('User no longer exists');
            error.status = 401;
            throw error;
        }

        req.user = user;
        next();

    }catch(err){
        if(err.name === 'JsonWebTokenError') {
            err.message = 'Invalid Token'
            err.status = 401;
        } else if(err.name === 'TokenExpiredError'){
            err.message = 'Token expired - please login again'
            err.status = 401;
        }

        next(err);
    }
}

module.exports = authMiddleware;
