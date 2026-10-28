const Favorite = require("../models/favorite_model");

const addFavorite = async (userId, birdId) => {
    const existingFavorite = await Favorite.find(userId, birdId);
    if (existingFavorite) {
        throw new Error("El ave ya está en favoritos");
    }

    return await Favorite.add(userId, birdId);
};

const getFavorites = async (userId) => {
    return await Favorite.getByUser(userId);
};

const removeFavorite = async (userId, birdId) => {
    const removed = await Favorite.remove(userId, birdId);
    if (!removed) {
        throw new Error("El favorito no existe");
    }
    return { userId, birdId };
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite
};