const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Mark = sequelize.define(
  "Mark",
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
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "marks" }
);

Mark.associate = (models) => {
  Mark.belongsTo(models.Lesson, {
    foreignKey: "lessonId",
    as: "lesson",
  });
  Mark.belongsTo(models.Child, {
    foreignKey: "childId",
    as: "child",
  });
};

module.exports = Mark;
