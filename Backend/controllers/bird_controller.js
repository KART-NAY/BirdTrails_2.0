const bird_service = require("../services/bird_service");

const getBirds = async (req, res) => {
    try {
        const birds = await bird_service.getAllBirds();
        res.status(200).json(birds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBirdById = async (req, res) => {
    try {
        const bird = await bird_service.getBirdById(req.params.id);
        if (!bird) {
            return res.status(404).json({ message: "Ave no encontrada" });
        }
        res.status(200).json(bird);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBird = async (req, res) => {
    try {
        const { userId, ...birdData } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const bird = await bird_service.createBird(userId, birdData);
        res.status(201).json({ message: "Ave agregada correctamente", bird });
    } catch (error) {
        const status = error.statusCode || 400;
        res.status(status).json({ message: error.message });
    }
};

const deleteBird = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        await bird_service.deleteBird(userId, req.params.id);
        res.status(200).json({ message: "Ave eliminada correctamente" });
    } catch (error) {
        const status = error.statusCode || 400;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    getBirds,
    getBirdById,
    createBird,
    deleteBird
};