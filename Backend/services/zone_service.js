const Zone = require("../models/zone_model");
const User = require("../models/user_model");

const validateAdmin = async (userId) => {
    const user = await User.findById(userId);
    if (!user || !user.canManageCatalog()) {
        const error = new Error("Acceso denegado: se requiere rol admin");
        error.statusCode = 403;
        throw error;
    }
};

const getAllZones = async () => {
    return await Zone.getAll();
};

const createZone = async (userId, zoneData) => {
    await validateAdmin(userId);

    if (!zoneData.name || !zoneData.location || !zoneData.description) {
        throw new Error("Nombre, ubicación y descripción de la zona son obligatorios");
    }

    return await Zone.create(zoneData);
};

const updateZone = async (userId, zoneId, zoneData) => {
    await validateAdmin(userId);

    if (!zoneData.name || !zoneData.location || !zoneData.description) {
        throw new Error("Nombre, ubicación y descripción de la zona son obligatorios");
    }

    const updated = await Zone.update(zoneId, zoneData);
    if (!updated) {
        const error = new Error("Zona no encontrada");
        error.statusCode = 404;
        throw error;
    }
    return updated;
};

const deleteZone = async (userId, zoneId) => {
    await validateAdmin(userId);

    const removed = await Zone.remove(zoneId);
    if (!removed) {
        const error = new Error("Zona no encontrada");
        error.statusCode = 404;
        throw error;
    }
    return true;
};

module.exports = {
    getAllZones,
    createZone,
    updateZone,
    deleteZone
};