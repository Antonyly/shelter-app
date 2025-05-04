const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/token');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Перевірка: чи є такий email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач з таким email вже існує' });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення користувача
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Генерація токена
    const token = generateToken(user._id);

    // Відповідь
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Перевірка, чи є такий користувач
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    // Перевірка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Невірний пароль' });
    }

    // Генеруємо токен
    const token = generateToken(user._id);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};
