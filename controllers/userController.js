const bcrypt = require("bcryptjs");

const { User, Role, Teacher, Parent } = require("../models");

const create = async (req, res) => {
  try {
    const { email, role, firstName, middleName, lastName, dateOfBirth, phone } =
      req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Пользователь уже существует" });
    }

    const existingRole = await Role.findOne({ where: { name: role } });
    if (!existingRole) {
      return res.status(404).json({ error: "Роли не существует" });
    }

    const password = genPassword();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      passwordHash: hashedPassword,
      roleId: existingRole.id,
    });

    if (existingRole.name === "parent") {
      await Parent.create({
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        phone,
        userId: user.id,
      });
    } else if (existingRole.name === "teacher") {
      await Teacher.create({
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        phone,
        userId: user.id,
      });
    }

    res.status(201).json({
      message: "Пользователь создан",
      email: user.email,
      password: password,
      role: existingRole.name,
    });
  } catch (e) {
    console.log(`Произошла ошибка при добавлении пользователя: ${e}`);
    return res.status(500).json({
      error: "Произошла ошибка при добавлении пользователя. Попробуйте еще раз",
    });
  }
};

const update = async (req, res) => {
  try {
    const user = req.user;
    const {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      phone,
      email,
      password,
      oldPassword,
    } = req.body;

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          error: "Адрес электронной почты уже занят",
        });
      }
    }

    if (password && !oldPassword) {
      return res.status(400).json({
        error: "Нужно указать старый пароль",
      });
    }

    if (password && oldPassword) {
      const isValidPassword = await bcrypt.compare(
        oldPassword,
        user.passwordHash
      );
      if (!isValidPassword) {
        return res.status(400).json({
          error: "Неверный старый пароль",
        });
      }
    }

    if (user.role.name === "parent") {
      await Parent.update(
        { firstName, middleName, lastName, dateOfBirth, phone },
        { where: { userId: user.id } }
      );
    } else if (user.role.name === "teacher") {
      await Teacher.update(
        { firstName, middleName, lastName, dateOfBirth, phone },
        { where: { userId: user.id } }
      );
    }

    let updateData = {};
    if (email) updateData.email = email;
    if (password) updateData.passwordHash = await bcrypt.hash(password, 10);

    if (Object.keys(updateData).length > 0) {
      await User.update(updateData, { where: { id: user.id } });
    }
    res.status(200).json({ message: "Данные успешно обновлены" });
  } catch (e) {
    console.log(`Произошла ошибка при обновлении данных пользователя: ${e}`);
    return res.status(500).json({
      error:
        "Произошла ошибка при обновлении данных пользователя. Попробуйте еще раз",
    });
  }
};

const genPassword = (minLength = 8, maxLength = 16) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";

  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};

module.exports = { create, update };
