const router = require("express").Router();
const authMiddlewares = require("../middlewares/authentication/auth_middleware");

router.get("/", authMiddlewares.checkToken);
router.post("/", authMiddlewares.verifyStudent);
router.put("/", authMiddlewares.verifyStudent);

module.exports = router;
