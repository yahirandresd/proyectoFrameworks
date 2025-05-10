import React, { useState } from "react";
import TablaGenerica from "../TablaGenerica";
import { ShieldCheck, Trash2 } from "lucide-react"; // Íconos de seguridad y eliminar

interface Permiso {
  id: number;
  url: string;
  method: string;
}

const Permisos: React.FC = () => {
  const [permisos, setPermisos] = useState<Permiso[]>([
    { id: 1, url: "/prueba", method: "POST" },
    { id: 2, url: "/prueba", method: "GET" },
    { id: 3, url: "/usuarios", method: "GET" },
    { id: 4, url: "/usuarios", method: "POST" },
    { id: 5, url: "/usuarios", method: "DELETE" },
    { id: 6, url: "/pedidos", method: "GET" },
    { id: 7, url: "/pedidos", method: "POST" },
    { id: 8, url: "/pedidos", method: "PUT" },
    { id: 9, url: "/pedidos", method: "DELETE" },
  ]);

  const manejarAccion = (accion: string, item: Permiso) => {
    if (accion === "asignar") {
      console.log("Asignar permiso:", item);
    } else if (accion === "eliminar") {
      console.log("Eliminar permiso:", item);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
        Lista de Permisos
      </h2>
      <TablaGenerica
        datos={permisos}
        columnas={["id", "url", "method"]}
        acciones={[
          {
            nombre: "asignar",
            etiqueta: "Asignar",
            icono: <ShieldCheck size={18} className="text-green-600" />,
          },
          {
            nombre: "eliminar",
            etiqueta: "Eliminar",
            icono: <Trash2 size={18} className="text-red-600" />,
          },
        ]}
        onAccion={manejarAccion}
      />
    </div>
  );
};

export default Permisos;
