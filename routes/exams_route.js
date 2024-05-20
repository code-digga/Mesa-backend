const router = require("express").Router();
const authMiddleware = require("../middlewares/authentication/auth_middleware");
const validators = require("../middlewares/validators/exam_validation");
const controller = require("../controllers/exam_controller");

// the id below is the course id for which we are fetching exams
router.get(
  "/:id",
  authMiddleware.verifyStudent,
  validators.fetchExams,
  controller.fetchExams
);

router.get(
  "/",
  authMiddleware.verifyStudent,
  validators.fetchQuestions,
  controller.fetchQuestions
);

module.exports = router;
