const User = require("./user");
const UserCoursesModel = require("./users_courses");
const Course = require("./courses");
const Result = require("./results");
const ExamsTests = require("./exams_tests");
const Lesson = require("./lessons");
const QA = require("./questions_answers");

Course.belongsToMany(User, { through: UserCoursesModel });
User.belongsToMany(Course, {
  through: UserCoursesModel,
});

ExamsTests.belongsTo(Course);
Course.hasMany(ExamsTests, { foreignKey: "course_id" });

Lesson.belongsTo(Course);
Course.hasMany(Lesson, { foreignKey: "course_id" });

ExamsTests.hasMany(QA, { foreignKey: "exam_id" });
QA.belongsTo(ExamsTests);

Result.belongsTo(Course);
Course.hasMany(Result, { foreignKey: "course_id" });

User.hasMany(Result, { foreignKey: "student_id" });
Result.belongsTo(User);

module.exports = {
  User,
  UserCoursesModel,
  Course,
  Result,
  ExamsTests,
  QA,
  Lesson,
};
