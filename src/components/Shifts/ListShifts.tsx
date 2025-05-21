// src/components/shifts/ListShifts.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Eye, Trash2 } from "lucide-react";
import { getShifts, deleteShift } from "../../services/shiftService";
import { Shift } from "../../models/Shift";

const ListShifts: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadShifts = async () => {
      try {
        const data = await getShifts();
        setShifts(data);
      } catch (error) {
        console.error("Error loading shifts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadShifts();
  }, []);

  const handleAction = async (action: string, item: Shift) => {
    if (action === "view") {
      navigate(`/view-shift/${item.id}`);
    } else if (action === "edit") {
      navigate(`/update-shift/${item.id}`);
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar el turno desde "${item.start_time}" hasta "${item.end_time}"?`)) {
        try {
          await deleteShift(item.id);
          setShifts(shifts.filter(s => s.id !== item.id));
        } catch (error) {
          console.error("Error deleting shift:", error);
        }
      }
    }
  };

  if (loading) return <div className="text-gray-800 dark:text-gray-200">Cargando turnos...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Lista de Turnos
        </h2>
        <button
          onClick={() => navigate("/create-shift")}
          className="bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
          Crear Turno
        </button>
      </div>

      <TablaGenerica
        datos={shifts}
        columnas={["id", "start_time", "end_time", "status", "driver_id", "motorcycle_id"]} 
        acciones={[
          {
            nombre: "view",
            etiqueta: "Ver",
            icono: <Eye size={18} className="text-green-600 dark:text-green-400" />,
          },
          {
            nombre: "edit",
            etiqueta: "Editar",
            icono: <Edit size={18} className="text-blue-600 dark:text-blue-400" />,
          },
          {
            nombre: "delete",
            etiqueta: "Eliminar",
            icono: <Trash2 size={18} className="text-red-600 dark:text-red-400" />,
          },
        ]}
        onAccion={handleAction}
      />
    </div>
  );
};

export default ListShifts;
