const router = require("express").Router();
const controller = require("../controllers/courses_controller");
const middleware = require("../middlewares/validators/course_validation");
const {
  verifyStudent,
  verifyTeacher,
  checkToken,
} = require("../middlewares/authentication/auth_middleware");

router.post(
  "/",
  verifyTeacher,
  middleware.validateAddCourse,
  controller.addNewCourse
);
router.post(
  "/register",
  verifyStudent,
  middleware.validateRegisterCourse,
  controller.registerCourse
);
router.get(
  "/",
  checkToken,
  middleware.validateFetchCourse,
  controller.fetchCourses
);
module.exports = router;
