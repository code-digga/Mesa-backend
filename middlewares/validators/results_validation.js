const Joi = require("joi");
const CustomError = require("../../utils/error_class");

const FetchResultsSchema = Joi.object({
  course_id: Joi.string().required(),
  exam_type: Joi.string(),
});

const CreateRecordSchema = Joi.object({
  course_id: Joi.string().required(),
  id: Joi.string().required(),
  type: Joi.string().required(),
});

const UpdateRecordSchema = Joi.object({
  course_id: Joi.string().required(),
  id: Joi.string().required(),
  type: Joi.string().required(),
  score: Joi.string().required(),
});

const validateResultFetch = async (req, res, next) => {
  const query = req.query;
  try {
    await FetchResultsSchema.validateAsync(query);
    next();
  } catch (error) {
    const err = new CustomError(400, error.message);
    next(err);
  }
};

const validateCreatingRecord = async (req, res, next) => {
  const body = req.body;
  try {
    await CreateRecordSchema.validateAsync(body);
    next();
  } catch (error) {
    const err = new CustomError(400, error.message);
    next(err);
  }
};

const validateUpdatingRecord = async (req, res, next) => {
  const body = req.body;
  try {
    await UpdateRecordSchema.validateAsync(body);
    next();
  } catch (error) {
    const err = new CustomError(400, error.message);
    next(err);
  }
};

module.exports = {
  validateResultFetch,
  validateCreatingRecord,
  validateUpdatingRecord,
};
