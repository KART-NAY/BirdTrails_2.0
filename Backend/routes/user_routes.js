const express = require("express");
const user_controller = require("../controllers/user_controller");

const router = express.Router();

router.post("/login", user_controller.login);
router.post("/register", user_controller.register);

module.exports = router;