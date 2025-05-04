// Завантаження змінних середовища з .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Порт і MongoDB URI з .env
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Routers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


// Середовище Express
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);

// Тестовий кореневий маршрут
app.get('/', (req, res) => {
  res.send('🐾 Притулок для тварин API запущено!');
});

// Підключення до MongoD
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Підключено до MongoDB');

  // Запуск сервера після підключення до Б
  app.listen(PORT, () => {
    console.log(`🚀 Сервер працює на http://localhost:${PORT}`);
  });

})
.catch((err) => {
  console.error('❌ Помилка підключення до MongoDB:', err.message);
});
