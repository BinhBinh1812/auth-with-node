const router = require("express").Router();
const authController = require("../controllers/auth.controller");

// register
router.post("/register", authController.register);

// login
router.post("/login", authController.logIn);

// log out
router.delete("/logout", authController.logOut);

//refresh token
router.post("/refresh", authController.refreshToken);

module.exports = router;
