const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");

const ExamsTests = sequelize.define(
  "ExamTests",
  {
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_points: DataTypes.INTEGER,
    assessment_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Exams", "Tests"]],
          msg: "Allowed types for assessment_type: Exams or Tests",
        },
      },
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "exam_tests",
  }
);

module.exports = ExamsTests;
