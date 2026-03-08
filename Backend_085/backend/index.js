// backend/index.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rutas (USAR LOS NOMBRES CORRECTOS)
app.use("/api/usuarios", require("./routes/usuario.route"));
app.use("/api/productos", require("./routes/producto.route")); // <- corregido
app.use("/api/empleados", require("./routes/empleado.route"));
app.use("/api/auth", require("./routes/auth.route"));

app.get("/", (req, res) => res.send("API funcionando - backend"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
