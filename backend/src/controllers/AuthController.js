const authService = require('../services/AuthService')
const AppError = require('../utils/AppError');
class AuthController {

    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                throw new AppError('Name, email and password are required', 400);
            }

            const result = await authService.register({ name, email, password });
            res.status(201).json({
                message: 'User register successfully',
                user: result.user,
                token: result.token
            }); // for register
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new AppError('Email and password are required', 400);
            }

            const result = await authService.login({ email, password });
            res.status(200).json({
                message: 'Login succesful',
                user: result.user,
                token: result.token
            }); // for login
        } catch (err) {
            next(err);
        }
    }

    async profile(req, res, next) {
        try{
            res.status(200).json({
                user: req.user
            })
        }catch(error){
            next(error);
        }
    }
}

module.exports = new AuthController();