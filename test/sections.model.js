const { DataTypes } = require("sequelize");

const sequelize = require("./index2.js");

const Section = sequelize.define(
  "Section",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: true, tableName: "sections" }
);

Section.associate = (models) => {
  Section.hasMany(models.Group, {
    foreignKey: "sectionId",
    as: "groups",
  });
};

module.exports = Section;
