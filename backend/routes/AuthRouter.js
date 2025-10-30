const { signup, login } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../middleware/AuthValidation');
const isAuthenticated = require('../middleware/Auth');
const UserModel = require('../models/User');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

// endpoint to check auth status (frontend can call this on app load)
// returns basic user info (username, email) when token is valid
router.get('/check', isAuthenticated, async (req, res) => {
	try {
		const userId = req.user?.id;
		if (!userId) return res.status(400).json({ success: false, message: 'No user id in token' });
		const user = await UserModel.findById(userId).select('username email phone bio');
		if (!user) return res.status(404).json({ success: false, message: 'User not found' });
		res.status(200).json({ success: true, user: { username: user.username, email: user.email, phone: user.phone, bio: user.bio } });
	} catch (err) {
		res.status(500).json({ success: false, message: 'Server error', error: err.message });
	}
});

const { updateProfile } = require('../controllers/authController');
router.patch('/profile', isAuthenticated, updateProfile);

module.exports = router;