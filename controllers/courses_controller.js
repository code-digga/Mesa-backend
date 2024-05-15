const { Course, UserCoursesModel } = require("../models/models_associations");
const CustomError = require("../utils/error_class");

const addNewCourse = async (req, res, next) => {
  const { course_title, course_code, course_units, teacher_id } = req.body;

  try {
    const newCourse = await Course.create({
      course_code: course_code,
      course_title: course_title,
      teacher_id: Number(teacher_id),
      course_units: Number(course_units),
    });
    console.log({ newCourse });
    res.status(201).json({
      success: true,
      message: "Course added successfully",
      data: newCourse.dataValues,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

const registerCourse = async (req, res, next) => {
  const { student_id, course_id } = req.body;
  try {
    const registeredCourse = await UserCoursesModel.create({
      user_id: Number(student_id),
      course_id: Number(course_id),
    });

    console.log({ registeredCourse });

    res.status(201).json({
      success: true,
      message: "Course registered successfully",
      data: registeredCourse.dataValues,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

module.exports = {
  addNewCourse,
  registerCourse,
};
