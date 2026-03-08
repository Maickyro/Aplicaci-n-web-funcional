import React, { useState } from "react";
import Productos from "./pages/productos";
import Usuarios from "./pages/usuarios";

function App() {
  const [pagina, setPagina] = useState("productos"); // Estado del menú

  // Título dinámico según la página
  const titulo = {
    productos: "Gestión de Productos",
    usuarios: "Gestión de Usuarios"
  };

  return (
    <div className="container mt-5">

      {/* Título dinámico */}
      <h2 className="text-center mb-4">{titulo[pagina]}</h2>

      {/* Botones de navegación centrados */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn me-2 ${pagina === "productos" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setPagina("productos")}
        >
          Productos
        </button>
        <button
          className={`btn ${pagina === "usuarios" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setPagina("usuarios")}
        >
          Usuarios
        </button>
      </div>

      {/* Contenido dinámico */}
      <div>
        {pagina === "productos" && <Productos />}
        {pagina === "usuarios" && <Usuarios />}
      </div>

    </div>
  );
}

export default App;