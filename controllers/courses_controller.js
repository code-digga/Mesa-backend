const {
  Course,
  UserCoursesModel,
  User,
} = require("../models/models_associations");
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
  const courseArray = course_id.split(",");
  let response = [];
  try {
    for (const id of courseArray) {
      const result = await UserCoursesModel.create({
        UserId: Number(student_id),
        CourseId: Number(id),
      });
      response.push(result.dataValues);
    }

    res.status(201).json({
      success: true,
      message: "Courses registered successfully",
      data: response,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

const fetchCourses = async (req, res, next) => {
  const { user_id, user_type, page } = req.query;
  const items_offset = (Number(page) - 1) * 10;
  const isATeacher = user_type === "Teacher";
  try {
    let courses_data;

    if (isATeacher) {
      courses_data = await Course.findAll({
        where: { teacher_id: user_id },
        limit: 10,
        offset: items_offset,
        raw: true,
      });
    } else {
      const courses = await User.findOne({
        where: { id: user_id },
        include: {
          model: Course,
          required: true,
          through: {
            attributes: [],
          },
        },
      });
      if (!courses) {
        throw new Error("User account not found");
      }
      courses_data = courses.dataValues.Courses;
    }
    res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: courses_data,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

module.exports = {
  addNewCourse,
  registerCourse,
  fetchCourses,
};
