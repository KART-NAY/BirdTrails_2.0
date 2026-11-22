const express = require("express");
const bird_controller = require("../controllers/bird_controller");

const router = express.Router();

router.get("/", bird_controller.getBirds);
router.get("/:id", bird_controller.getBirdById);
router.post("/", bird_controller.createBird);
router.delete("/:id", bird_controller.deleteBird);

module.exports = router;