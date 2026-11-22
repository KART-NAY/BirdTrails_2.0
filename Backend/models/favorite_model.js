const db = require("../config/data_base");

class Favorite {
    static async find(userId, birdId) {
        const [rows] = await db.query(
            "SELECT * FROM favorite WHERE user_id = ? AND bird_id = ?",
            [userId, birdId]
        );
        return rows[0] || null;
    }

    static async add(userId, birdId) {
        const [result] = await db.query(
            "INSERT INTO favorite (user_id, bird_id) VALUES (?, ?)",
            [userId, birdId]
        );
        return {
            id: result.insertId,
            userId,
            birdId
        };
    }

    static async getByUser(userId) {
        const [rows] = await db.query(
            `SELECT
                f.id AS favoriteId,
                f.bird_id AS birdId,
                f.created_at AS createdAt,
                b.id AS id,
                b.common_name AS commonName,
                b.scientific_name AS scientificName,
                b.local_name AS localName,
                i.url AS image
             FROM favorite f
             INNER JOIN bird b ON f.bird_id = b.id
             LEFT JOIN image i ON b.image_id = i.id
             WHERE f.user_id = ?
             ORDER BY f.created_at DESC`,
            [userId]
        );
        return rows;
    }

    static async remove(userId, birdId) {
        const [result] = await db.query(
            "DELETE FROM favorite WHERE user_id = ? AND bird_id = ?",
            [userId, birdId]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Favorite;