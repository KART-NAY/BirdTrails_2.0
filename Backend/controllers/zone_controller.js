const zone_service = require("../services/zone_service");

const getZones = async (req, res) => {
    try {
        const zones = await zone_service.getAllZones();
        res.status(200).json(zones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createZone = async (req, res) => {
    try {
        const { userId, ...zoneData } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const zone = await zone_service.createZone(userId, zoneData);
        res.status(201).json({ message: "Cartilla de zona agregada correctamente", zone });
    } catch (error) {
        const status = error.statusCode || 400;
        res.status(status).json({ message: error.message });
    }
};

const updateZone = async (req, res) => {
    try {
        const { userId, ...zoneData } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const zone = await zone_service.updateZone(userId, req.params.id, zoneData);
        res.status(200).json({ message: "Cartilla de zona actualizada correctamente", zone });
    } catch (error) {
        const status = error.statusCode || 400;
        res.status(status).json({ message: error.message });
    }
};

const deleteZone = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        await zone_service.deleteZone(userId, req.params.id);
        res.status(200).json({ message: "Cartilla de zona eliminada correctamente" });
    } catch (error) {
        const status = error.statusCode || 400;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    getZones,
    createZone,
    updateZone,
    deleteZone
};