const { DataTypes, Deferrable } = require("sequelize");
const { sequelize } = require("../config/db.config");
const User = require("./user");
const UserCoursesModel = require("./users_courses");
const Results = require("./results");
const Lesson = require("./lessons");
const Exams = require("./exams_tests");

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
      validate: {
        isAlphanumeric: true,
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
      },
    },
  },
  {
    tableName: "courses",
  }
);

Course.belongsToMany(User, { through: UserCoursesModel });

Course.hasMany(Results, { foreignKey: "course_id" });

Course.hasMany(Lesson, { foreignKey: "course_id" });

Course.hasMany(Exams, { foreignKey: "course_id" });

module.exports = Course;
