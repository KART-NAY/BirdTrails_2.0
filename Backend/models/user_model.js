const db = require("../config/data_base");

class User {
    static async findByEmail(email) {
        const [rows] = await db.execute("SELECT * FROM User WHERE email = ?", [email]);
        return rows[0] || null;
    }

    static async findById(id) {
        const [rows] = await db.execute("SELECT id, name, email FROM User WHERE id = ?", [id]);
        return rows[0] || null;
    }

    static async create(name, email, password) {
        const [result] = await db.execute(
            "INSERT INTO User (name, email, password) VALUES (?, ?, ?)",
            [name, email, password]
        );
        return { id: result.insertId, name, email };
    }
}

module.exports = User;