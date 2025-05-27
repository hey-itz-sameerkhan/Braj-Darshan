const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.email}! You are authorized.`,
    userId: req.user.id
  });
});

module.exports = router;
