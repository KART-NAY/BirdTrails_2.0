const db = require("../config/data_base");

class Favorite {
    static async find(userId, birdId) {
        const [rows] = await db.execute(
            "SELECT * FROM Favorite WHERE userId = ? AND birdId = ?",
            [userId, birdId]
        );
        return rows[0] || null;
    }

    static async add(userId, birdId) {
        const [result] = await db.execute(
            "INSERT INTO Favorite (userId, birdId) VALUES (?, ?)",
            [userId, birdId]
        );
        return { id: result.insertId, userId, birdId };
    }

    static async getByUser(userId) {
        const [rows] = await db.execute(
            "SELECT id as favoriteId, birdId, createdAt FROM Favorite WHERE userId = ?",
            [userId]
        );
        return rows;
    }

    static async remove(userId, birdId) {
        const [result] = await db.execute(
            "DELETE FROM Favorite WHERE userId = ? AND birdId = ?",
            [userId, birdId]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Favorite;