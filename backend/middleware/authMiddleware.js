const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Немає токена авторизації' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    req.user = user; // ⬅️ Додаємо користувача до запиту
    next();

  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Недійсний токен' });
  }
};

module.exports = authMiddleware;
