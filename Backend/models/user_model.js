const db = require("../config/data_base");

class User {
    constructor({ id, name, email, role }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role || "normal";
    }

    canManageCatalog() {
        return false;
    }

    static instantiateByRole(row) {
        if (!row) return null;
        if (row.role === "admin") {
            return new AdminUser(row);
        }
        return new NormalUser(row);
    }

    static async findByEmail(email) {
        const [rows] = await db.query(
            "SELECT id, name, email, password, role FROM users WHERE email = ?",
            [email]
        );
        return rows[0] || null;
    }

    static async findById(id) {
        const [rows] = await db.query(
            "SELECT id, name, email, role FROM users WHERE id = ?",
            [id]
        );
        return User.instantiateByRole(rows[0]);
    }

    static async create(name, email, password, role = "normal") {
        const validRole = role === "admin" ? "admin" : "normal";
        const [result] = await db.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, password, validRole]
        );
        return await User.findById(result.insertId);
    }
}

class NormalUser extends User {
    constructor(data) {
        super({ ...data, role: "normal" });
    }
}

class AdminUser extends User {
    constructor(data) {
        super({ ...data, role: "admin" });
    }

    canManageCatalog() {
        return true;
    }
}

module.exports = User;