const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Lesson = sequelize.define(
  "Lesson",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "lessons" }
);

Lesson.associate = (models) => {
  Lesson.belongsTo(models.Schedule, {
    foreignKey: "scheduleId",
    as: "schedule",
  });
  Lesson.hasMany(models.Attendance, {
    foreignKey: "lessonId",
    as: "attendances",
  });
  Lesson.hasMany(models.Marks, {
    foreignKey: "lessonId",
    as: "marks",
  });
};

module.exports = Lesson;
