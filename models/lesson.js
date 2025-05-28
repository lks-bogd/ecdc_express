"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsTo(models.Schedule, {
        foreignKey: "scheduleId",
        as: "schedule",
      });
      Lesson.hasMany(models.Attendance, {
        foreignKey: "lessonId",
        as: "attendances",
      });
      Lesson.hasMany(models.Mark, {
        foreignKey: "lessonId",
        as: "marks",
      });
    }
  }
  Lesson.init(
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
        references: {
          model: "schedules",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Lesson",
      tableName: "lessons",
      timestamps: true,
    }
  );
  return Lesson;
};
