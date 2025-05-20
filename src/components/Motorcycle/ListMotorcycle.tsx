import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2, Eye } from "lucide-react";
import { getMotorcycles, deleteMotorcycle } from "../../services/motorcycleService";
import { Motorcycle } from "../../models/Motorcycle";

const ListMotorcycles: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMotorcycles = async () => {
      try {
        const data = await getMotorcycles();
        setMotorcycles(data);
      } catch (error) {
        console.error("Error loading motorcycles:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMotorcycles();
  }, []);

  const handleAction = async (action: string, item: Motorcycle) => {
    if (action === "edit") {
      console.log("Edit motorcycle:", item);
      // Lógica para editar
    } else if (action === "delete") {
      if (window.confirm(`Delete motorcycle with plate ${item.license_plate}?`)) {
        try {
          await deleteMotorcycle(item.id);
          setMotorcycles(motorcycles.filter(m => m.id !== item.id));
        } catch (error) {
          console.error("Error deleting motorcycle:", error);
        }
      }
    }
  };

  if (loading) return <div>Loading motorcycles...</div>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Motorcycle List</h2>
      <TablaGenerica<Motorcycle>
        datos={motorcycles}
        columnas={["license_plate", "brand", "year", "status"]}
        acciones={[
          {
            nombre: "view",
            etiqueta: "ver",
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