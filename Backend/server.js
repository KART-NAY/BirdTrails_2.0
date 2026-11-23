const express = require("express");
const cors = require("cors");
const path = require("path");

const user_routes = require("./routes/user_routes");
const favorite_routes = require("./routes/favorite_routes");
const bird_routes = require("./routes/bird_routes");
const zone_routes = require("./routes/zone_routes");

const app = express();

app.use(cors());
app.use(express.json());

// Servidor de estáticos para SPA
app.use(express.static(path.join(__dirname, "../frontend")));

// Endpoints
app.use("/api/users", user_routes);
app.use("/api/favorites", favorite_routes);
app.use("/api/birds", bird_routes);
app.use("/api/zones", zone_routes);

app.get("/api/health", (req, res) => {
    res.json({ message: "Servidor activo en MySQL" });
});

// Cambiado a 5000 para no colisionar con Live Server (5500)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor de BirdTrails en ejecución en http://localhost:${PORT}`);
});