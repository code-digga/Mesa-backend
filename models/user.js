const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");
const { hashPassword } = require("../utils/crypto_utils");
const Courses = require("./courses");
const UserCoursesModel = require("./users_courses");
const Result = require("./results");

const User = sequelize.define(
  "User",
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", hashPassword(this.value));
      },
    },
    api_key: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      set(value) {
        this.setDataValue("api_key");
      },
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Teacher",
      validate: {
        isIn: {
          args: [["Teacher", "Student"]],
          msg: "Allowed values for user_type: Teacher or Student",
        },
      },
    },
  },
  {
    tableName: "users",
  }
);

User.belongsToMany(Courses, {
  through: UserCoursesModel,
});
User.hasMany(Result, { foreignKey: "student_id" });
module.exports = User;
