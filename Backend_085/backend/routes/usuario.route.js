const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/usuario.controller");

router.get("/", ctrl.obtenerUsuarios);
router.get("/:id", ctrl.obtenerUsuarioPorId);
router.post("/", ctrl.crearUsuario);
router.put("/:id", ctrl.actualizarUsuario);
router.delete("/:id", ctrl.eliminarUsuario);

module.exports = router;
