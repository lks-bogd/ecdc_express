const jwt = require("jsonwebtoken");

const { User } = require("../models");

require("dotenv").config();

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Вы не авторизованы. Авторизуйтесь в системе" });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res
      .status(400)
      .json({ error: "Произошла ошибка: токен истек или поврежден" });
  }

  const user = await User.findByPk(decoded.id, {
    attributes: { exclude: ["passwordHash"] },
    include: [
      { association: "refreshToken" },
      { association: "parent" },
      { association: "teacher" },
      { association: "role" },
    ],
  });

  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }

  req.user = user;
  next();
};

module.exports = checkAuth;
