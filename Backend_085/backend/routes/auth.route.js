const express = require("express");
const router = express.Router();

const demo = {
  email: "admin@test.com",
  password: "123456"
};

router.get("/login", (req, res) => {
  const { email, password } = req.query;
  if (!email || !password) return res.status(400).json({ msg: "Faltan datos" });
  if (email !== demo.email) return res.status(400).json({ msg: "Usuario no encontrado" });
  if (password !== demo.password) return res.status(400).json({ msg: "Contraseña incorrecta" });
  res.json({ msg: "Login exitoso", usuario: email });
});

module.exports = router;

