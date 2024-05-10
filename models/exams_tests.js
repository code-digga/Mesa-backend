const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Course = require("./courses");
const Questions = require("./questions_answers");

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
  },
  {
    tableName: "exam_tests",
  }
);

ExamsTests.belongsTo(Course);
ExamsTests.hasMany(Questions, { foreignKey: "exam_id" });

module.exports = ExamsTests;
