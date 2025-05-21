import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrder } from "../../services/orderService";
import { Order } from "../../models/Order";

const EditOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Order>();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      const order = await getOrderById(Number(id));
      if (!order) {
        navigate("/", { replace: true });
        setTimeout(() => {
          alert("Pedido no encontrado");
        }, 0);
        return;
      }

      reset(order);
    };

    fetchOrder();
  }, [id, navigate, reset]);

  const onSubmit = async (data: Order) => {
    if (!id) return;
    try {
      const updated = await updateOrder(Number(id), data);
      if (updated) {
        alert("Pedido actualizado con éxito");
        navigate("/orders");
      } else {
        alert("Error actualizando pedido");
      }
    } catch (error) {
      console.error("Error actualizando pedido:", error);
      alert("Error actualizando pedido");
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Pedido</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cantidad</label>
          <input type="number" {...register("quantity", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio Total</label>
          <input type="number" step="0.01" {...register("total_price", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <input {...register("status")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID de Motocicleta</label>
          <input type="number" {...register("motorcycle_id", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID del Cliente</label>
          <input type="number" {...register("customer_id", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID del Menú</label>
          <input type="number" {...register("menu_id", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Pedido
        </button>
      </form>
    </div>
  );
};

export default EditOrder;
