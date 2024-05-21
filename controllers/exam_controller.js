const { ExamsTests, QA } = require("../models/models_associations");
const CustomError = require("../utils/error_class");

const fetchExams = async (req, res, next) => {
  const { id } = req.params;
  try {
    const exams = await ExamsTests.findAll({
      where: {
        course_id: id,
      },
      raw: true,
    });
    res.status(200).json({
      success: true,
      message: "Exams fetched successfully",
      data: exams,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

const fetchQuestions = async (req, res, next) => {
  const { id } = req.query;
  try {
    const questions = await QA.findAll({
      where: {
        exam_id: id,
      },
      raw: true,
    });

    res.status(200).json({
      success: true,
      message: "Questions fetched successfully",
      data: questions,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

module.exports = {
  fetchExams,
  fetchQuestions,
};
