import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getDrivers, deleteDriver } from "../../services/driverService";
import { Driver } from "../../models/Driver";

const ListDrivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (action === "edit") {
      console.log("Edit driver:", item);
      // Lógica para editar
    } else if (action === "delete") {
      if (window.confirm(`Delete driver ${item.name}?`)) {
        try {
          await deleteDriver(item.id);
          setDrivers(drivers.filter(d => d.id !== item.id));
        } catch (error) {
          console.error("Error deleting driver:", error);
        }
      }
    }
  };

  if (loading) return <div>Loading drivers...</div>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Driver List</h2>
      <TablaGenerica
        datos={drivers}
        columnas={["name", "license_number", "phone", "email", "status"]}
        acciones={[
          {
            nombre: "edit",
            etiqueta: "Edit",
            icono: <Edit size={18} className="text-blue-600" />,
          },
          {
            nombre: "delete",
            etiqueta: "Delete",
            icono: <Trash2 size={18} className="text-red-600" />,
          },
        ]}
        onAccion={handleAction}
      />
    </div>
  );
};

export default ListDrivers;