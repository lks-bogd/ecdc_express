const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/router.js");
const { sequelize } = require("./models");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api", router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Подключение к БД установлено`);
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту: ${PORT}`);
    });
  } catch (e) {
    console.log(`Произошла ошибка при запуске сервера: ${e}`);
  }
};

startServer();
