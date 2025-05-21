// src/components/orders/ListOrders.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2, Eye } from "lucide-react";
import { Order } from "../../models/Order";
import { getOrders, deleteOrder } from "../../services/orderService";
import Swal from "sweetalert2";

const ListOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error al cargar las órdenes:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleAction = async (action: string, item: Order) => {
    if (action === "view") {
      navigate(`/view-order/${item.id}`);
    } else if (action === "edit") {
      navigate(`/update-orders/${item.id}`);
    } else if (action === "delete") {
      const result = await Swal.fire({
        title: `¿Estás seguro?`,
        text: `Eliminar la orden #${item.id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        customClass: {
          confirmButton: 'swal2-confirm-btn',
          cancelButton: 'swal2-cancel-btn'
        },
        buttonsStyling: false // para que use nuestros estilos y no los predeterminados
      });
      
      

      if (result.isConfirmed) {
        try {
          await deleteOrder(item.id);
          setOrders(orders.filter(o => o.id !== item.id));
          Swal.fire("¡Eliminado!", "La orden ha sido eliminada.", "success");
        } catch (error) {
          console.error("Error eliminando la orden:", error);
          Swal.fire("Error", "No se pudo eliminar la orden.", "error");
        }
      }
    }
  };

  if (loading) return <div>Cargando órdenes...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Lista de Órdenes
        </h2>
        <button
          onClick={() => navigate("/create-orders")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
           Crear Orden
        </button>
      </div>

      <TablaGenerica<Order>
        datos={orders}
        columnas={["id", "quantity", "total_price", "status", "motorcycle_id", "customer_id", "menu_id"]} 
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

export default ListOrders;
