const Joi = require("joi");
const CustomError = require("../../utils/error_class");

const AddCourseSchema = Joi.object({
  course_code: Joi.string().required(),
  course_title: Joi.string().required(),
  teacher_id: Joi.string().required(),
  course_units: Joi.string().required(),
});

const RegisterCourseSchema = Joi.object({
  course_id: Joi.string().required(),
  student_id: Joi.string().required(),
});

const FetchCourseSchema = Joi.object({
  user_type: Joi.string().required(),
  user_id: Joi.string().required(),
  page: Joi.string().required(),
});
const validateAddCourse = async (req, res, next) => {
  try {
    const isValid = await AddCourseSchema.validateAsync(req.body);
    next();
  } catch (error) {
    const err = new CustomError(400, error.message);
    next(err);
  }
};

const validateRegisterCourse = async (req, res, next) => {
  try {
    const isValid = await RegisterCourseSchema.validateAsync(req.body);
    next();
  } catch (error) {
    const err = new CustomError(400, error.message);
    next(err);
  }
};

const validateFetchCourse = async (req, res, next) => {
  try {
    const isValid = await FetchCourseSchema.validateAsync(req.query);
    next();
  } catch (error) {
    const err = new CustomError(400, error.message);
    next(err);
  }
};
module.exports = {
  validateAddCourse,
  validateRegisterCourse,
  validateFetchCourse,
};
