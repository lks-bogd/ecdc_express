"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mark.belongsTo(models.Lesson, {
        foreignKey: "lessonId",
        as: "lesson",
      });
      Mark.belongsTo(models.Child, {
        foreignKey: "childId",
        as: "child",
      });
    }
  }
  Mark.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
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
      modelName: "Mark",
      tableName: "marks",
      timestamps: true,
    }
  );
  return Mark;
};
