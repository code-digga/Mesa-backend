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
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

module.exports = {
  fetchExams,
  fetchQuestions,
};
