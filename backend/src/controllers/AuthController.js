const authService = require('../services/AuthService')
class AuthController {

    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                const error = new Error('Name, email and password are required');
                error.status = 400;
                throw error
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
                const error = new Error('Email and password are required');
                error.status = 400;
                throw error;
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