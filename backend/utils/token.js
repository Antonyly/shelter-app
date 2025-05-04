const jwt = require('jsonwebtoken');

// Беремо секрет з .env або тимчасово використовуємо жорстко прописаний рядок
const JWT_SECRET = process.env.JWT_SECRET || 'default_development_secret';

// Створює токен з userId (дійсний 7 днів)
function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

// Перевіряє токен — повертає об'єкт { userId }
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken
};