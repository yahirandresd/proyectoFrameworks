import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2, Eye } from "lucide-react";
import { Order } from "../../models/Order";
// Aquí deberías tener tus servicios para obtener y eliminar órdenes
import { getOrders, deleteOrder } from "../../services/orderService";
import Swal from "sweetalert2";

const ListOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Cargar órdenes al iniciar
  useEffect(() => {
    const loadOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    loadOrders();
  }, []);

  const handleAction = async (action: string, item: Order) => {
    if (action === "edit") {
      console.log("Editar orden:", item);
      // lógica de edición
    } else if (action === "delete") {
      const result = await Swal.fire({
        title: `¿Estás seguro?`,
        text: `Eliminar la orden #${item.id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
  
      if (result.isConfirmed) {
        await deleteOrder(item.id);
        setOrders(orders.filter((o) => o.id !== item.id));
        Swal.fire("¡Eliminado!", "La orden ha sido eliminada.", "success");
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

export default ListOrders;