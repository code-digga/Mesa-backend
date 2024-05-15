const router = require("express").Router();
const controller = require("../controllers/courses_controller");
const middleware = require("../middlewares/validators/course_validation");

router.post("/", middleware.validateAddCourse, controller.addNewCourse);
router.post(
  "/register",
  middleware.validateRegisterCourse,
  controller.registerCourse
);
