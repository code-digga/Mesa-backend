const router = require("express").Router();
const authMiddlewares = require("../middlewares/authentication/auth_middleware");
const middlewares = require("../middlewares/validators/results_validation");
const controller = require("../controllers/results_controller");

router.get(
  "/",
  authMiddlewares.verifyTeacher,
  middlewares.validateResultFetch,
  controller.fetchAllResults
);
router.get(
  "/:id",
  authMiddlewares.verifyStudent,
  middlewares.validateResultFetch,
  controller.fetchUserResults
);
router.post(
  "/",
  authMiddlewares.verifyStudent,
  middlewares.validateCreatingRecord,
  controller.createRecord
);
router.put(
  "/",
  authMiddlewares.verifyStudent,
  middlewares.validateUpdatingRecord,
  controller.updateRecord
);

module.exports = router;
