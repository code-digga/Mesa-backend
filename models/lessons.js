const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Course = require("./courses");
const Lesson = sequelize.define(
  "Lessons",
  {
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
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
    topic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    intro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "lessons" }
);

module.exports = Lesson;
