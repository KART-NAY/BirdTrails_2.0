// const db = require("../config/data_base");

// class Bird {
//     static generateBirdId(bird) {
//         if (bird.id && typeof bird.id === "string") return bird.id;
//         if (!bird.commonName) return `ave_${bird.id || "desconocida"}`;
        
//         return bird.commonName
//             .toLowerCase()
//             .replaceAll(" ", "_");
//     }

//     static async getAll() {
//         const [rows] = await db.execute("SELECT * FROM Bird");
//         return rows.map(bird => ({
//             ...bird,
//             id: Bird.generateBirdId(bird)
//         }));
//     }

//     static async getById(id) {
//         const [rows] = await db.execute("SELECT * FROM Bird WHERE id = ?", [id]);
//         if (!rows[0]) return null;
//         return {
//             ...rows[0],
//             id: Bird.generateBirdId(rows[0])
//         };
//     }
// }

// module.exports = Bird;