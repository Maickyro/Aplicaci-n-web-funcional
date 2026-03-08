const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  peso: { type: Number, required: true },
  fabricante: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Producto", productoSchema);
