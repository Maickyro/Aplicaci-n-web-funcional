import React, { useState, useEffect } from "react";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [editando, setEditando] = useState(null);

  const obtenerUsuarios = () => {
    fetch("http://localhost:3000/api/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data));
  };

  useEffect(() => { obtenerUsuarios(); }, []);

  const guardarUsuario = (e) => {
    e.preventDefault();
    const metodo = editando ? "PUT" : "POST";
    const url = editando
      ? `http://localhost:3000/api/usuarios/${editando}`
      : "http://localhost:3000/api/usuarios";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password, rol })
    }).then(() => {
      obtenerUsuarios();
      setNombre(""); setEmail(""); setPassword(""); setRol(""); setEditando(null);
    });
  };

  const editarUsuario = (u) => {
    setNombre(u.nombre);
    setEmail(u.email);
    setPassword(u.password);
    setRol(u.rol);
    setEditando(u._id);
  };

  const eliminarUsuario = (id) => {
    fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" })
      .then(() => obtenerUsuarios());
  };

  return (
    <div className="container mt-4">


      {/* Cuadro del formulario */}
      <div style={{
        border: "1px solid #000",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        marginBottom: "20px"
      }}>
        <form onSubmit={guardarUsuario}>
          <div className="row g-2 align-items-end">

            <div className="col-md-3">
              <label className="form-label">Nombre</label>
              <input 
                className="form-control" 
                value={nombre} 
                onChange={e => setNombre(e.target.value)} 
                placeholder="Nombre"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Email</label>
              <input 
                type="email"
                className="form-control" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="ejemplo@dominio.com"
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Rol</label>
              <input 
                className="form-control" 
                value={rol} 
                onChange={e => setRol(e.target.value)} 
              />
            </div>

            <div className="col-md-1">
              <button type="submit" className="btn btn-primary w-100">
                {editando ? "Actualizar" : "Crear"}
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* Tabla de usuarios */}
      <div style={{
        border: "1px solid #000",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "#f8f9fa"
      }}>
        <table className="table table-striped table-bordered mb-0">
          <thead className="table-dark text-center">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Password</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {usuarios.map(u => (
              <tr key={u._id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.password}</td>
                <td>{u.rol}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editarUsuario(u)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(u._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Usuarios;