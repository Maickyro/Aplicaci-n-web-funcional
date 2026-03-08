const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/empleado.controller");

router.get("/", ctrl.obtenerEmpleados);
router.get("/:id", ctrl.obtenerEmpleadoPorId);
router.post("/", ctrl.crearEmpleado);
router.put("/:id", ctrl.actualizarEmpleado);
router.delete("/:id", ctrl.eliminarEmpleado);

module.exports = router;
