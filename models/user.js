const { sequelize } = require("../config/db_config");
const { DataTypes } = require("sequelize");
const { hashPassword } = require("../utils/crypto_jwt");

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
        this.setDataValue("password", hashPassword(value));
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

module.exports = User;
