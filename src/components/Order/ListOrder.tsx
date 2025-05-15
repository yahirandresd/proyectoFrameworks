import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { Order } from "../../models/Order";
// Aquí deberías tener tus servicios para obtener y eliminar órdenes
import { getOrders, deleteOrder } from "../../services/orderService";

const ListOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Cargar órdenes al iniciar
  useEffect(() => {
    const loadOrders = async () => {
      // Reemplaza esto por tu servicio real
      const data = await getOrders();
      setOrders(data);
    };
    loadOrders();
  }, []);

  const handleAction = async (action: string, item: Order) => {
    if (action === "edit") {
      console.log("Editar orden:", item);
      // Aquí iría la lógica para abrir el formulario de edición
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar la orden #${item.id}?`)) {
        await deleteOrder(item.id);
        setOrders(orders.filter(o => o.id !== item.id));
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
        Lista de Órdenes
      </h2>
      <TablaGenerica
        datos={orders}
        columnas={["id", "quantity", "total_price", "status"]}
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

export default ListOrders;