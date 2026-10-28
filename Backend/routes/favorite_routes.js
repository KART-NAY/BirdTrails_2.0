const express = require("express");
const favorite_controller = require("../controllers/favorite_controller");

const router = express.Router();

router.post("/", favorite_controller.addFavorite);
router.get("/", favorite_controller.getFavorites);
router.delete("/", favorite_controller.removeFavorite);

module.exports = router;