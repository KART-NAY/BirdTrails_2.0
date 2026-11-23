const db = require("../config/data_base");
const Image = require("./image_model");
const BirdBuilderService = require("../patterns/birds_builder");

class Bird {
    static mapRowToRaw(row) {
        return {
            id: row.id,
            commonName: row.common_name,
            scientificName: row.scientific_name,
            author: row.author,
            family: row.family,
            altitudinalRange: row.altitudinal_range,
            size: row.size,
            sexualDimorphism: row.sexual_dysmorphism,
            habitat: row.habitat,
            presenceType: row.presence_type,
            localName: row.local_name,
            feeding: row.feeding,
            additionalData: row.additional_data,
            image: row.image_url || ""
        };
    }

    

    static async getAll() {
        const [rows] = await db.query(
            `SELECT b.*, i.url AS image_url
             FROM bird b
             LEFT JOIN image i ON b.image_id = i.id
             ORDER BY b.id ASC`
        );
        return rows.map(row => BirdBuilderService.buildDetailedSheet(Bird.mapRowToRaw(row)));
    }

    static async getById(id) {
        const [rows] = await db.query(
            `SELECT b.*, i.url AS image_url
             FROM bird b
             LEFT JOIN image i ON b.image_id = i.id
             WHERE b.id = ?`,
            [id]
        );
        if (!rows[0]) return null;
        return BirdBuilderService.buildDetailedSheet(Bird.mapRowToRaw(rows[0]));
    }

    static async create(birdInput) {
        const builtData = BirdBuilderService.buildPersistenceModel(birdInput);
        const imageRecord = builtData.image
            ? await Image.create(builtData.image, builtData.commonName)
            : null;

        const [result] = await db.query(
            `INSERT INTO bird (
                common_name, scientific_name, author, family, altitudinal_range,
                size, sexual_dysmorphism, habitat, presence_type, local_name,
                feeding, additional_data, image_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                builtData.commonName,
                builtData.scientificName,
                builtData.author,
                builtData.family,
                builtData.altitudinalRange,
                builtData.size,
                builtData.sexualDimorphism,
                builtData.habitat,
                builtData.presenceType,
                builtData.localName,
                builtData.feeding,
                builtData.additionalData,
                imageRecord ? imageRecord.id : null
            ]
        );

        return await Bird.getById(result.insertId);
    }

    static async remove(id) {
        const [result] = await db.query("DELETE FROM bird WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Bird;