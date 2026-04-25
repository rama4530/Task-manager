const express = require('express');
const router = express.Router()
const authController = require('../controllers/AuthController')
const authMiddleWare = require('../middleware/authMiddleware');

router.post('/register',authController.register)

router.post('/login', authController.login)

router.get('/profile', authController.profile)

module.exports = router;