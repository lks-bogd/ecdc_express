const { Role } = require("../models");

const create = async (req, res) => {
  try {
    const { name, desc } = req.body;

    const candidate = await Role.findOne({ where: { name } });

    if (candidate) {
      return res.status(400).json("Роль уже существует");
    }

    const role = await Role.create({ name, desc });

    res.status(201).json(role);
  } catch (e) {
    console.log(`Произошла ошибка при добавлении роли: ${e}`);
    return res.status(500).json({
      error: "Произошла ошибка при добавлении роли. Попробуйте еще раз",
    });
  }
};

module.exports = { create };
