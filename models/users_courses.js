const { sequelize } = require("../config/db_config");
const { DataTypes, Deferrable } = require("sequelize");
const Users = require("./user");
const Courses = require("./courses");

const UsersCourses = sequelize.define(
  "UsersCourses",
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: Users,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "course_id",
      references: {
        model: Courses,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    taken_tests: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    taken_exams: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "users_courses",
  }
);

module.exports = UsersCourses;
