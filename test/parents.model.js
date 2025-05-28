const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Parent = sequelize.define(
  "Parent",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
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

Parent.associate = (models) => {
  Parent.hasMany(models.Child, {
    foreignKey: "parentId",
    as: "children",
  });

  Parent.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};

module.exports = Parent;
