const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/UserRepository');
require('dotenv').config()

class AuthService {
    
    async register({name, email, password}){
        // Rule 1 - check if email already exists
        const existingUser = await userRepository.findByEmail(email);
        if(existingUser) {
            const error = new Error('Email already registered');
            error.status = 409
            throw error;
        }
        // Rule 2 has the password before saving
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Rule 3 - save to DB via repository
        const user = await userRepository.createUser({name, email, password_hash});

        // Rule 4 - geenrate JWT token
        const token = this.generateToken(user);
        const { password_hash:_, ...safeUser} = user

        return { user: safeUser, token }
    }

    async login({ email, password}){
        const user = await userRepository.findByEmail(email);
        if(!user){
            const error = new Error('Invalid email or password');
            error.status = 401
            throw error
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch) {
            const error = new Error('Invalid email or password');
            error.status = 401
            throw error
        }

        const token = this.generateToken(user)

        const { password_hash, ...safeUser} = user

        return { user: safeUser, token }
    }

    generateToken(user){
        return jwt.sign(
            {id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
    }
}

module.exports = new AuthService();