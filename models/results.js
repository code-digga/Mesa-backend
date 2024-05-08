const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");

const Result = sequelize.define(
  "Result",
  {
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
