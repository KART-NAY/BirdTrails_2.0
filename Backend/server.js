const express = require("express");
const cors = require("cors");
const path = require("path");

const user_routes = require("./routes/user_routes");
const favorite_routes = require("./routes/favorite_routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

// Endpoints 
app.use("/api/users", user_routes);
app.use("/api/favorites", favorite_routes);

app.get("/api/health", (req, res) => {
    res.json({ message: "Servidor activo en MySQL" });
});

// Cambiado a 5000 para no colisionar con Live Server (5500)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor de BirdTrails en ejecución en http://localhost:${PORT}`);
});