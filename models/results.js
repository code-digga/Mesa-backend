const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Courses = require("./courses");
const User = require("./user");

const Result = sequelize.define(
  "Result",
  {
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Courses,
        key: "id",
      },
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    student_result: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exam_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Exams", "Tests"]],
          msg: "Allowed values for exam_type: Exams or Tests",
        },
      },
    },
  },
  {
    tableName: "results",
  }
);

Result.belongsTo(Courses);

Result.belongsTo(User);

module.exports = Result;
