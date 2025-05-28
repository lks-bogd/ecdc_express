const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Group = sequelize.define(
  "Group",
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
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "groups" }
);

Group.associate = (models) => {
  Group.belongsTo(models.Section, {
    foreignKey: "sectionId",
    as: "section",
  });
  Group.hasMany(models.Schedule, {
    foreignKey: "groupId",
    as: "schedules",
  });
  Group.hasMany(models.Enrollment, {
    foreignKey: "groupId",
    as: "enrollments",
  });
};

module.exports = Group;
