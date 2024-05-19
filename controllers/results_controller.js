const { Result, UserCoursesModel } = require("../models/models_associations");
const CustomError = require("../utils/error_class");

const fetchAllResults = async (req, res, next) => {
  const { course_id, exam_type } = req.query;
  const examType = exam_type === "exams" ? "Exams" : "Tests";
  try {
    const results = await Result.findAll({
      where: { course_id: course_id, exam_type: examType },
      raw: true,
    });
    res.status(200).json({
      success: true,
      message: "Results retrieved successfully",
      data: results,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

const fetchUserResults = async (req, res, next) => {
  const { course_id } = req.query;
  const { id } = req.params;
  try {
    const results = await Result.findAll({
      where: {
        student_id: id,
        course_id: course_id,
      },
      raw: true,
    });
    res.status(200).json({
      success: true,
      message: "User results fetched",
      data: results,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

const createRecord = async (req, res, next) => {
  const { course_id, id, type } = req.body;
  const examType = type === "exams" ? "Exams" : "Tests";

  try {
    await Promise.allSettled([
      Result.create({
        course_id: course_id,
        student_id: id,
        exam_type: examType,
      }),
      UserCoursesModel.update(
        examType === "Exams"
          ? {
              taken_exams: true,
            }
          : {
              taken_tests: true,
            },
        {
          where: {
            CourseId: course_id,
            UserId: id,
          },
        }
      ),
    ]);
    res.status(201).json({
      success: true,
      message: "Record created",
      data: {
        course_id,
        id,
        type,
      },
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

const updateRecord = async (req, res, next) => {
  const { course_id, id, type, score } = req.body;
  const examType = type === "exams" ? "Exams" : "Tests";
  try {
    const updatedRecord = await Result.update(
      {
        student_result: score,
      },
      {
        where: {
          student_id: id,
          course_id: course_id,
          exam_type: examType,
        },
        raw: true,
      }
    );
    res.status(201).json({
      success: true,
      message: "Scores updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

module.exports = {
  fetchAllResults,
  fetchUserResults,
  createRecord,
  updateRecord,
};
