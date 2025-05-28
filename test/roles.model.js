const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "roles",
  }
);

Role.associate = (models) => {
  Role.hasMany(models.User, {
    foreignKey: "roleId",
    as: "users",
  });
};

module.exports = Role;
