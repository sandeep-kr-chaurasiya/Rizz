const isAuthenticated = require('../middleware/Auth');
const router = require('express').Router();

router.get('/', isAuthenticated, (req, res) => {
  res.json({ message: 'Product route is working!' });
});

module.exports = router;