const { DataTypes, Deferrable, Sequelize } = require("sequelize");
const { sequelize } = require("../config/db.config");
const User = require("./user");

const Course = sequelize.define(
  "Course",
  {
    course_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_units: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isValid(value) {
          if (value < 1 || value > 6) {
            throw new Error(
              "Course units cannot be less than 1 nor greater than 6"
            );
          }
        },
      },
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    tableName: "courses",
  }
);

module.exports = Course;
