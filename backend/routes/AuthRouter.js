const { signup } = require('../controllers/authController');
const { signupValidation } = require('../middleware/AuthValidation');

const router = require('express').Router();

router.post('/login', (req, res) => {
    res.send('Login route');
});

router.post('/signup',signupValidation ,signup);

module.exports = router;