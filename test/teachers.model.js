const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Teacher = sequelize.define(
  "Teacher",
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
  { timestamps: true, tableName: "teachers" }
);

Teacher.associate = (models) => {
  Teacher.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
  Teacher.hasMany(models.Schedule, {
    foreignKey: "teacherId",
    as: "schedules",
  });
};

module.exports = Teacher;
