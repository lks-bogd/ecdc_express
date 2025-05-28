"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
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
    }
  }
  Enrollment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      childId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "children",
          key: "id",
        },
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "groups",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Enrollment",
      tableName: "enrollments",
      timestamps: true,
    }
  );
  return Enrollment;
};
