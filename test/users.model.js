const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 32],
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },
  },
  { timestamps: true, tableName: "users" }
);

User.associate = (models) => {
  User.belongsTo(models.Role, {
    foreignKey: "roleId",
    as: "role",
  });
  User.hasOne(models.Parent, {
    foreignKey: "userId",
    as: "parent",
  });
  User.hasOne(models.RefreshToken, {
    foreignKey: "userId",
    as: "refreshToken",
  });
  User.hasOne(models.Teacher, {
    foreignKey: "userId",
    as: "teacher",
  });
};

module.exports = User;
