// src/pages/Order/ViewOrder.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../services/orderService";
import { Order } from "../../models/Order";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { Eye } from "lucide-react";
import MapOne from "../../components/Map/Map";

const ViewOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Swal.fire({
      title: "Cargando pedido...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    getOrderById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró el pedido.",
            confirmButtonText: "Volver",
            confirmButtonColor: "#3085d6",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(-1);
            }
          });
        } else {
          setOrder(data);
          Swal.close();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar el pedido.",
          confirmButtonText: "Volver",
          confirmButtonColor: "#d33",
        }).then(() => navigate(-1));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return null; // Loading se muestra con Swal

  if (!order) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle del Pedido</h2>

      <div className="mb-2">
        <strong>ID:</strong> {order.id}
      </div>

      <div className="mb-2">
        <strong>Cantidad:</strong> {order.quantity}
      </div>

      <div className="mb-2">
        <strong>Precio Total:</strong> ${order.total_price.toFixed(2)}
      </div>

      <div className="mb-2">
        <strong>Estado:</strong> {order.status}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div>
          <strong>ID de la Motocicleta:</strong> {order.motorcycle_id ?? "No asignado"}
        </div>
        {order.motorcycle_id && (
          <button
            onClick={() => navigate(`/view-motorcycles/${order.motorcycle_id}`)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} className="mr-1" />
            Mostrar
          </button>
        )}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div>
          <strong>ID del Cliente:</strong> {order.customer_id ?? "No asignado"}
        </div>
        {order.customer_id && (
          <button
            onClick={() => navigate(`/view-customers/${order.customer_id}`)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} className="mr-1" />
            Mostrar
          </button>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <strong>ID del Menú:</strong> {order.menu_id ?? "No asignado"}
        </div>
        {order.menu_id && (
          <button
            onClick={() => navigate(`/view-menus/${order.menu_id}`)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} className="mr-1" />
            Mostrar
          </button>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Volver
      </button>
      <br />
      <br />
      <MapOne motorcycleId={order.motorcycle_id} />
    </div>
  );
};

export default ViewOrder;
    