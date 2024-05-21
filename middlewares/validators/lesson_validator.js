const Joi = require("joi");
const CustomError = require("../../utils/error_class");

const AddLessonSchema = Joi.object({
  course_id: Joi.string().required(),
  course_code: Joi.string().required(),
  topic: Joi.string().required(),
  notes: Joi.string().required(),
  intro: Joi.string().required(),
});

const FetchLessonsSchema = Joi.object({
  course_id: Joi.string().required(),
  page: Joi.string().required(),
});

const validateAddLesson = (req, res, next) => {
  try {
    const isValid = AddLessonSchema.validateAsync(req.body);
    next();
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

const validateFetchLesson = (req, res, next) => {
  try {
    const isValid = FetchLessonsSchema.validateAsync(req.query);
    next();
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

module.exports = {
  validateAddLesson,
  validateFetchLesson,
};
