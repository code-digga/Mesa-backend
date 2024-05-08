const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");

const Lesson = sequelize.define(
  "Lessons",
  {
    course_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "lessons" }
);
