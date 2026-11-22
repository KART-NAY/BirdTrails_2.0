    const Bird = require("../models/birds_model");
const User = require("../models/user_model");

const getAllBirds = async () => {
    return await Bird.getAll();
};

const getBirdById = async (id) => {
    return await Bird.getById(id);
};

const createBird = async (userId, birdData) => {
    const user = await User.findById(userId);
    if (!user || !user.canManageCatalog()) {
        const error = new Error("Acceso denegado: se requiere rol admin");
        error.statusCode = 403;
        throw error;
    }

    if (!birdData.commonName || !birdData.scientificName) {
        throw new Error("El nombre común y el nombre científico son obligatorios");
    }

    return await Bird.create(birdData);
};

const deleteBird = async (userId, birdId) => {
    const user = await User.findById(userId);
    if (!user || !user.canManageCatalog()) {
        const error = new Error("Acceso denegado: se requiere rol admin");
        error.statusCode = 403;
        throw error;
    }

    const removed = await Bird.remove(birdId);
    if (!removed) {
        const error = new Error("Ave no encontrada");
        error.statusCode = 404;
        throw error;
    }
    return true;
};

module.exports = {
    getAllBirds,
    getBirdById,
    createBird,
    deleteBird
};