const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/", verifyToken, userController.getAllUser);

module.exports = router;
