const express = require("express");
const zone_controller = require("../controllers/zone_controller");

const router = express.Router();

router.get("/", zone_controller.getZones);
router.post("/", zone_controller.createZone);
router.put("/:id", zone_controller.updateZone);
router.delete("/:id", zone_controller.deleteZone);

module.exports = router;