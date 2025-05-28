const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      unique: true,
    },
  },
  { timestamps: true, tableName: "parents" }
);

RefreshToken.associate = (models) => {
  RefreshToken.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};

module.exports = RefreshToken;
