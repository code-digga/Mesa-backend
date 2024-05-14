const authController = require("../controllers/auth_controller");
const router = require("express").Router();

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);

module.exports = router;
