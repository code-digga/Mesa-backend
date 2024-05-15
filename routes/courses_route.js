const router = require("express").Router();
const controller = require("../controllers/courses_controller");
const middleware = require("../middlewares/validators/course_validation");
const checkToken = require("../middlewares/authentication/auth_middleware");

router.use(checkToken);
router.post("/", middleware.validateAddCourse, controller.addNewCourse);
router.post(
  "/register",
  middleware.validateRegisterCourse,
  controller.registerCourse
);

module.exports = router;
