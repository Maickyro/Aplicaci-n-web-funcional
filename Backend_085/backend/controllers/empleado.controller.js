const Empleado = require("../models/empleado");

exports.obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerEmpleadoPorId = async (req, res) => {
  try {
    const e = await Empleado.findById(req.params.id);
    if (!e) return res.status(404).json({ msg: "Empleado no encontrado" });
    res.json(e);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crearEmpleado = async (req, res) => {
  try {
    const nuevo = new Empleado(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizarEmpleado = async (req, res) => {
  try {
    const actualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ msg: "Empleado no encontrado" });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminarEmpleado = async (req, res) => {
  try {
    const eliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ msg: "Empleado no encontrado" });
    res.json({ mensaje: "Empleado eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
