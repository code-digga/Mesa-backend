const authController = require("../controllers/auth_controller");
const middleware = require("../middlewares/auth_middlewares/auth_validation");
const router = require("express").Router();

router.post("/register", middleware.validateRegister, authController.signUp);
router.post("/login", middleware.validateLogin, authController.signIn);

module.exports = router;
