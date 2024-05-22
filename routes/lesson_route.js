const router = require("express").Router();
const fileLoader = require("../config/multer_config");
const authChecker = require("../middlewares/authentication/auth_middleware");
const validator = require("../middlewares/validators/lesson_validator");
const controller = require("../controllers/lesson_controller");

router.get(
  "/",
  authChecker.verifyStudent,
  validator.validateFetchLesson,
  controller.fetchLessons
);
router.post(
  "/",
  authChecker.verifyTeacher,
  validator.validateAddLesson,
  fileLoader,
  controller.addLesson
);

module.exports = router;
