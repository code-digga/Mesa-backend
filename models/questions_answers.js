const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Exams = require("./exams_tests");

const QA = sequelize.define(
  "QA",
  {
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    option_1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    option_2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    option_3: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    option_4: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    has_options: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    correct_option: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [["1", "2", "3", "4"]],
        },
      },
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Exams,
        key: "id",
      },
    },
  },
  {
    tableName: "questions_answers",
  }
);

QA.belongsTo(Exams);

module.exports = QA;
