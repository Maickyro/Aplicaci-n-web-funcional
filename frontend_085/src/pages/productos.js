import React, { useState, useEffect } from "react";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [peso, setPeso] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [editando, setEditando] = useState(null);

  const obtenerProductos = () => {
    fetch("http://localhost:3000/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data));
  };

  useEffect(() => { obtenerProductos(); }, []);

  const guardarProducto = (e) => {
    e.preventDefault();
    const metodo = editando ? "PUT" : "POST";
    const url = editando
      ? `http://localhost:3000/api/productos/${editando}`
      : "http://localhost:3000/api/productos";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio, peso, fabricante })
    }).then(() => {
      obtenerProductos();
      setNombre(""); setPrecio(""); setPeso(""); setFabricante(""); setEditando(null);
    });
  };

  const editarProducto = (p) => {
    setNombre(p.nombre);
    setPrecio(p.precio);
    setPeso(p.peso);
    setFabricante(p.fabricante);
    setEditando(p._id);
  };

  const eliminarProducto = (id) => {
    fetch(`http://localhost:3000/api/productos/${id}`, { method: "DELETE" })
      .then(() => obtenerProductos());
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
        <form onSubmit={guardarProducto}>
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

            <div className="col-md-2">
              <label className="form-label">Precio</label>
              <input 
                type="number" 
                className="form-control" 
                value={precio} 
                onChange={e => setPrecio(e.target.value)} 
                placeholder="Precio"
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Peso</label>
              <input 
                type="number" 
                className="form-control" 
                value={peso} 
                onChange={e => setPeso(e.target.value)} 
                placeholder="Peso"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Fabricante</label>
              <input 
                className="form-control" 
                value={fabricante} 
                onChange={e => setFabricante(e.target.value)} 
                placeholder="Fabricante"
              />
            </div>

            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                {editando ? "Actualizar" : "Crear"}
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* Tabla de productos */}
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
              <th>Precio</th>
              <th>Peso</th>
              <th>Fabricante</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {productos.map(p => (
              <tr key={p._id}>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.peso}</td>
                <td>{p.fabricante}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editarProducto(p)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(p._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Productos;