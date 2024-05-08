const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");

const UsersCourses = sequelize.define(
  "UsersCourses",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
