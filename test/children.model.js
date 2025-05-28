const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Child = sequelize.define(
  "Child",
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
      type: DataTypes.STRING(10),
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
  { timestamps: true, tableName: "children" }
);

Child.associate = (models) => {
  Child.belongsTo(models.Parent, {
    foreignKey: "parentId",
    as: "parent",
  });
  Child.hasMany(models.Attendance, {
    foreignKey: "childId",
    as: "attendances",
  });
  Child.hasMany(models.Marks, {
    foreignKey: "childId",
    as: "marks",
  });
  Child.hasMany(models.Enrollment, {
    foreignKey: "childId",
    as: "enrollments",
  });
};

module.exports = Child;
