"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
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
    }
  }
  Schedule.init(
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
        references: {
          model: "groups",
          key: "id",
        },
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "teachers",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Schedule",
      tableName: "schedules",
      timestamps: true,
    }
  );
  return Schedule;
};
