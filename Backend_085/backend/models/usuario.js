const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, default: "usuario" }
}, { timestamps: true });

module.exports = mongoose.model("Usuario", usuarioSchema);