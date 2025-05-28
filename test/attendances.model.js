const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Attendance = sequelize.define(
  "Attendance",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    present: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "attendances" }
);

Attendance.associate = (models) => {
  Attendance.belongsTo(models.Child, {
    foreignKey: "childId",
    as: "child",
  });
  Attendance.belongsTo(models.Lesson, {
    foreignKey: "lessonId",
    as: "lesson",
  });
};

module.exports = Attendance;
