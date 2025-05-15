// src/components/shifts/ListShifts.tsx
import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getShifts, deleteShift } from "../../services/shiftService";
import { Shift } from "../../models/Shift";

const ListShifts: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    const loadShifts = async () => {
      const data = await getShifts();
      setShifts(data);
    };
    loadShifts();
  }, []);

  const handleAction = async (action: string, item: Shift) => {
    if (action === "edit") {
      console.log("Editar turno:", item);
      // Aquí iría la lógica para abrir el formulario de edición
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar el turno desde "${item.start_time}" hasta "${item.end_time}"?`)) {
        await deleteShift(item.id);
        setShifts(shifts.filter(s => s.id !== item.id));
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
        Lista de Turnos
      </h2>
      <TablaGenerica
        datos={shifts}
        columnas={["id", "start_time", "end_time", "status"]}
        acciones={[
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

export default ListShifts;
