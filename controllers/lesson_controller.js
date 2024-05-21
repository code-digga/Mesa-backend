const uploader = require("../config/cloudinary_config");
const { Lesson } = require("../models/models_associations");
const CustomError = require("../utils/error_class");

const fetchLessons = async (req, res, next) => {
  const { course_id, page } = req.query;
  const listOffset = (page - 1) * 20;
  try {
    const lessons = await Lesson.findAll({
      where: {
        course_id: course_id,
      },
      raw: true,
      limit: 20,
      offset: listOffset,
    });

    res.status(200).json({
      success: true,
      message: "Lessons retrieved successfully",
      data: lessons,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

const addLesson = async (req, res, next) => {
  const file = req.file;
  const params = req.body;
  try {
    const fileUrl = await uploader(params.course_code, file);
    const newLesson = await Lesson.create(
      {
        course_id: params.course_id,
        notes: params.notes,
        topic: params.topic,
        intro: params.intro,
        link: fileUrl,
      },
      {
        raw: true,
      }
    );

    res.status(201).json({
      success: true,
      message: "Lesson added successfully",
      data: newLesson,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    next(err);
  }
};

module.exports = {
  fetchLessons,
  addLesson,
};
