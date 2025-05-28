const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Schedule = sequelize.define(
  "Schedule",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dayOfWeek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "schedules" }
);

Schedule.associate = (models) => {
  Schedule.belongsTo(models.Section, {
    foreignKey: "sectionId",
    as: "section",
  });
  Schedule.belongsTo(models.Teacher, {
    foreignKey: "teacherId",
    as: "teacher",
  });
  Schedule.hasMany(models.Lesson, {
    foreignKey: "scheduleId",
    as: "lessons",
  });
};

module.exports = Schedule;
