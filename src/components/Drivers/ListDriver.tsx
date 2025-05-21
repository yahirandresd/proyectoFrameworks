import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Eye, Trash2 } from "lucide-react";
import { getDrivers, deleteDriver } from "../../services/driverService";
import { Driver } from "../../models/Driver";
import Swal from "sweetalert2";

const ListDrivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const data = await getDrivers();
        setDrivers(data);
      } catch (error) {
        console.error("Error loading drivers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDrivers();
  }, []);

  const handleAction = async (action: string, item: Driver) => {
    if (action === "view") {
      navigate(`/view-driver/${item.id}`);
    } else if (action === "edit") {
      navigate(`/update-customers/${item.id}`);
    } else if (action === "delete") {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Eliminar al conductor ${item.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          await deleteDriver(item.id);
          setDrivers(drivers.filter((d) => d.id !== item.id));
          Swal.fire("¡Eliminado!", "El conductor ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error deleting driver:", error);
          Swal.fire("Error", "No se pudo eliminar el conductor.", "error");
        }
      }
    }
  };

  if (loading) return <div>Cargando conductores...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Lista de Conductores</h2>
        <button
          onClick={() => navigate("/create-drivers")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
           Crear Conductor
        </button>
      </div>

      <TablaGenerica<Driver>
        datos={drivers}
        columnas={["name", "license_number", "phone", "email", "status"]}
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

export default ListDrivers;
