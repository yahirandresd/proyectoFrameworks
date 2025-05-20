// src/components/motorcycles/ListMotorcycles.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2, Eye } from "lucide-react";
import { getMotorcycles, deleteMotorcycle } from "../../services/motorcycleService";
import { Motorcycle } from "../../models/Motorcycle";
import Swal from "sweetalert2";

const ListMotorcycles: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMotorcycles = async () => {
      try {
        const data = await getMotorcycles();
        setMotorcycles(data);
      } catch (error) {
        console.error("Error al cargar motocicletas:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMotorcycles();
  }, []);

  const handleAction = async (action: string, item: Motorcycle) => {
    if (action === "view") {
      navigate(`/motorcycles/view/${item.id}`);
    } else if (action === "edit") {
      navigate(`/update-motorcycles/${item.id}`);
    } else if (action === "delete") {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Eliminar motocicleta con placa ${item.license_plate}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          await deleteMotorcycle(item.id);
          setMotorcycles(motorcycles.filter(m => m.id !== item.id));
          Swal.fire("¡Eliminada!", "La motocicleta ha sido eliminada.", "success");
        } catch (error) {
          console.error("Error eliminando la motocicleta:", error);
          Swal.fire("Error", "No se pudo eliminar la motocicleta.", "error");
        }
      }
    }
  };

  if (loading) return <div>Cargando motocicletas...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Lista de Motocicletas
        </h2>
        <button
          onClick={() => navigate("/create-motorcycles")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
           Crear Motocicleta
        </button>
      </div>

      <TablaGenerica<Motorcycle>
        datos={motorcycles}
        columnas={["license_plate", "brand", "year", "status"]}
        acciones={[
          {
            nombre: "view",
            etiqueta: "Ver",
            icono: <Eye size={18} className="text-green-600" />,
          },
          {
            nombre: "edit",
            etiqueta: "Editar",
            icono: <Edit size={18} className="text-blue-600" />,
          },
          {
            nombre: "delete",
            etiqueta: "Eliminar",
            icono: <Trash2 size={18} className="text-red-600" />,
          },
        ]}
        onAccion={handleAction}
      />
    </div>
  );
};

export default ListMotorcycles;
