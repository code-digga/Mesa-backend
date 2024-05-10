const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Users = require("./user");
const Courses = require("./courses");

const UsersCourses = sequelize.define(
  "UsersCourses",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
