"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Child extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Child.belongsTo(models.Parent, {
        foreignKey: "parentId",
        as: "parent",
      });
      Child.hasMany(models.Attendance, {
        foreignKey: "childId",
        as: "attendances",
      });
      Child.hasMany(models.Mark, {
        foreignKey: "childId",
        as: "marks",
      });
      Child.hasMany(models.Enrollment, {
        foreignKey: "childId",
        as: "enrollments",
      });
    }
  }
  Child.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "parents",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Child",
      timestamps: true,
      tableName: "children",
    }
  );
  return Child;
};
