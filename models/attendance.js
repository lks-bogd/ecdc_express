"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.Child, {
        foreignKey: "childId",
        as: "child",
      });
      Attendance.belongsTo(models.Lesson, {
        foreignKey: "lessonId",
        as: "lesson",
      });
    }
  }
  Attendance.init(
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
        references: {
          model: "children",
          key: "id",
        },
      },
      lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "lessons",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Attendance",
      tableName: "attendances",
      timestamps: true,
    }
  );
  return Attendance;
};
