const favorite_service = require("../services/favorite_service");

const addFavorite = async (req, res) => {
    try {
        const { userId, birdId } = req.body;
        if (!userId || !birdId) {
            return res.status(400).json({ message: "userId y birdId son obligatorios" });
        }

        const favorite = await favorite_service.addFavorite(userId, birdId);
        res.status(201).json({ message: "Ave agregada a favoritos", favorite });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getFavorites = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: "userId es obligatorio" });
        }

        const favorites = await favorite_service.getFavorites(userId);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { userId, birdId } = req.body;
        if (!userId || !birdId) {
            return res.status(400).json({ message: "userId y birdId son obligatorios" });
        }

        const favorite = await favorite_service.removeFavorite(userId, birdId);
        res.status(200).json({ message: "Ave eliminada de favoritos", favorite });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite
};