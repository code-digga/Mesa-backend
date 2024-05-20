const Joi = require("joi");
const CustomError = require("../../utils/error_class");

const FetchCourseExamsSchema = Joi.object({
  id: Joi.string().required(),
});

const FetchQuestionsSchema = Joi.object({
  id: Joi.string().required(),
});

const fetchExams = async (req, res, next) => {
  try {
    const valid = await FetchCourseExamsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    const err = new CustomError(400, error.message);
    next(err);
  }
};

const fetchQuestions = async (req, res, next) => {
  try {
    const valid = await FetchQuestionsSchema.validateAsync(req.query);
    next();
  } catch (error) {
    const err = new CustomError(400, error.message);
    next(err);
  }
};

module.exports = {
  fetchExams,
  fetchQuestions,
};
