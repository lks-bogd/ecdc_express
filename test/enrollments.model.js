const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Enrollment = sequelize.define(
  "Enrollment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "enrollments" }
);

Enrollment.associate = (models) => {
  Enrollment.belongsTo(models.Child, {
    foreignKey: "childId",
    as: "child",
  });
  Enrollment.belongsTo(models.Group, {
    foreignKey: "groupId",
    as: "group",
  });
};

module.exports = Enrollment;
