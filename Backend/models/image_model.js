const db = require("../config/data_base");

class Image {
    constructor({ id, url, alt_text }) {
        this.id = id;
        this.url = url;
        this.altText = alt_text;
    }

    static async findByUrl(url) {
        const [rows] = await db.query("SELECT * FROM image WHERE url = ?", [url]);
        return rows[0] ? new Image(rows[0]) : null;
    }

    static async findById(id) {
        const [rows] = await db.query("SELECT * FROM image WHERE id = ?", [id]);
        return rows[0] ? new Image(rows[0]) : null;
    }

    static async create(url, altText = "") {
        const existing = await Image.findByUrl(url);
        if (existing) {
            return existing;
        }

        const [result] = await db.query(
            "INSERT INTO image (url, alt_text) VALUES (?, ?)",
            [url, altText]
        );
        return await Image.findById(result.insertId);
    }
}

module.exports = Image;