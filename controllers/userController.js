const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Role, RefreshToken } = require("../models");

require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [{ model: RefreshToken, as: "refreshToken" }],
    });
    if (!user) {
      return res.status(400).json({ error: "Неверный email или пароль" });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Неверный email или пароль" });
    }

    const existingRefreshToken = await RefreshToken.findOne({
      where: { userId: user.id },
    });

    const { accessToken, refreshToken } = genTokens(user);

    if (existingRefreshToken) {
      await existingRefreshToken.update({ value: refreshToken });
    } else {
      await RefreshToken.create({
        value: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ accessToken: accessToken });
  } catch (e) {
    console.log(`Произошла ошибка при попытке войти в систему: ${e}`);
    return res.status(500).json({
      error: "Произошла ошибка при попытке войти в систему. Попробуйте еще раз",
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Пользователь уже существует" });
    }

    const existingRole = await Role.findOne({ where: { name: role } });
    if (!existingRole) {
      return res.status(404).json({ error: "Роли не существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      passwordHash: hashedPassword,
      roleId: existingRole.id,
    });

    const { accessToken, refreshToken } = genTokens(user);

    await RefreshToken.create({
      value: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(201).json({ accessToken: accessToken });
  } catch (e) {
    console.log(`Произошла ошибка при зарегистрироваться в системе: ${e}`);
    return res.status(500).json({
      error:
        "Произошла ошибка при зарегистрироваться в системе. Попробуйте еще раз",
    });
  }
};

const refreshTokens = async (req, res) => {
  try {
    const oldRefreshToken = req.cookies.refresh_token;
    if (!oldRefreshToken) {
      return res
        .status(401)
        .json({ error: "Произошла ошибка: отсутствует токен обновления" });
    }

    let decoded;
    try {
      decoded = jwt.verify(oldRefreshToken, process.env.JWT_SECRET);
    } catch (e) {
      return res
        .status(401)
        .json({ error: "Произошла ошибка: токен истек или поврежден" });
    }

    const user = await User.findByPk(decoded.id, {
      include: [{ model: RefreshToken, as: "refreshToken" }],
    });

    if (
      !user ||
      !user.refreshToken ||
      user.refreshToken.value !== oldRefreshToken
    ) {
      return res
        .status(401)
        .json({ error: "Произошла ошибка: токен истек или поврежден" });
    }

    const { accessToken, refresToken } = genTokens(user);

    await user.refreshToken.update({
      value: refresToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refresh_token", refresToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ accessToken: accessToken });
  } catch (e) {
    console.log(`Произошла ошибка при обновлении токенов: ${e}`);
    return res.status(500).json({
      error: "Произошла ошибка на сервере. Попробуйте еще раз",
    });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    if (refreshToken) {
      await RefreshToken.destroy({ where: { value: refreshToken } });
    }

    res.status(200).json({ message: "Выход выполнен успешно" });
  } catch (e) {
    console.error(`Произошла ошибка при выходе: ${e.message}`);
    return res.status(500).json({
      error: "Произошла ошибка на сервере. Попробуйте еще раз",
    });
  }
};

const genTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    roleId: user.roleId,
  };
  try {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  } catch (e) {
    console.log(`Произошла ошибка при создании токенов: ${e}`);
    return res.status(500).json({
      error: "Произошла ошибка на сервере. Попробуйте еще раз",
    });
  }
};

module.exports = { register, login, logout, refreshTokens };
