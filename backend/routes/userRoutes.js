const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Приватний маршрут: отримати профіль поточного користувача
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;