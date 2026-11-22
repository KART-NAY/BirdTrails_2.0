const db = require("../config/data_base");
const Image = require("./image_model");

class Zone {
    static mapRow(row) {
        if (!row) return null;
        return {
            id: row.id,
            name: row.name,
            location: row.location,
            description: row.description,
            image: row.image,
            birdIds: row.birdIdsRaw
                ? String(row.birdIdsRaw).split(",").map(Number)
                : []
        };
    }

    static async getAll() {
        const [rows] = await db.query(
            `SELECT
                z.id,
                z.name,
                z.location,
                z.description,
                i.url AS image,
                GROUP_CONCAT(zb.bird_id) AS birdIdsRaw
             FROM zone z
             LEFT JOIN image i ON z.image_id = i.id
             LEFT JOIN zone_bird zb ON z.id = zb.zone_id
             GROUP BY z.id, z.name, z.location, z.description, i.url
             ORDER BY z.id ASC`
        );
        return rows.map(Zone.mapRow);
    }

    static async getById(id) {
        const [rows] = await db.query(
            `SELECT
                z.id,
                z.name,
                z.location,
                z.description,
                i.url AS image,
                GROUP_CONCAT(zb.bird_id) AS birdIdsRaw
             FROM zone z
             LEFT JOIN image i ON z.image_id = i.id
             LEFT JOIN zone_bird zb ON z.id = zb.zone_id
             WHERE z.id = ?
             GROUP BY z.id, z.name, z.location, z.description, i.url`,
            [id]
        );
        return Zone.mapRow(rows[0]);
    }

    static async syncZoneBirds(zoneId, birdIds = []) {
        await db.query("DELETE FROM zone_bird WHERE zone_id = ?", [zoneId]);
        for (const birdId of birdIds) {
            await db.query(
                "INSERT IGNORE INTO zone_bird (zone_id, bird_id) VALUES (?, ?)",
                [zoneId, Number(birdId)]
            );
        }
    }

    static async create({ name, location, description, image, birdIds = [] }) {
        const imageRecord = image ? await Image.create(image, name) : null;
        const [result] = await db.query(
            `INSERT INTO zone (name, location, description, image_id)
             VALUES (?, ?, ?, ?)`,
            [name, location, description, imageRecord ? imageRecord.id : null]
        );

        const zoneId = result.insertId;
        await Zone.syncZoneBirds(zoneId, birdIds);
        return await Zone.getById(zoneId);
    }

    static async update(id, { name, location, description, image, birdIds = [] }) {
        const imageRecord = image ? await Image.create(image, name) : null;
        const [result] = await db.query(
            `UPDATE zone
             SET name = ?,
                 location = ?,
                 description = ?,
                 image_id = COALESCE(?, image_id)
             WHERE id = ?`,
            [name, location, description, imageRecord ? imageRecord.id : null, id]
        );

        if (result.affectedRows === 0) return null;
        await Zone.syncZoneBirds(id, birdIds);
        return await Zone.getById(id);
    }

    static async remove(id) {
        const [result] = await db.query("DELETE FROM zone WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Zone;