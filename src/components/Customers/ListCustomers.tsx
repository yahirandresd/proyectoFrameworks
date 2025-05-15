import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getCustomers, deleteCustomer } from "../../services/customerService";
import { Customer } from "../../models/Customer";

const ListCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error loading customers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const handleAction = async (action: string, item: Customer) => {
    if (action === "edit") {
      console.log("Edit customer:", item);
      // Lógica para editar
    } else if (action === "delete") {
      if (window.confirm(`Delete customer ${item.name}?`)) {
        try {
          await deleteCustomer(item.id);
          setCustomers(customers.filter(c => c.id !== item.id));
        } catch (error) {
          console.error("Error deleting customer:", error);
        }
      }
    }
  };

  if (loading) return <div>Loading customers...</div>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Customer List</h2>
      <TablaGenerica
        datos={customers}
        columnas={["name", "email", "phone"]}
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

export default ListCustomers;