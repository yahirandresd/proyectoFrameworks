import React from "react";
import { useForm } from "react-hook-form";
import { createOrder } from "../../services/orderService"; // Ajusta la ruta si es necesario

interface OrderFormValues {
    quantity: number; // Cantidad de productos pedidos
    total_price: number; // Precio total del pedido
    status: string; // Estado del pedido (ej. "pendiente", "completado", etc.)
    motorcycle_id: number; // ID de la Orden asociada al pedido
    customer_id: number; // ID del cliente que realizó el pedido
    menu_id: number; // ID del menú asociado al pedido
}

const CreateOrder: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<OrderFormValues>();

  const onSubmit = async (data: OrderFormValues) => {
    try {
      const result = await createOrder(data); // Hace POST al backend
      if (result) {
        alert("✅ Orden creada con éxito");
        reset();
      } else {
        alert("❌ Error al crear la Orden");
      }
    } catch (error) {
      alert("❌ Error inesperado");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Crear Orden</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cantidad</label>
          <input type="number"{...register("quantity", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.quantity && <p className="text-red-600">La cantidad es obligatoria</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio total</label>
          <input type="number" {...register("total_price", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.total_price && <p className="text-red-600">El precio es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Id motocicleta</label>
          <input type="number" {...register("motorcycle_id", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.motorcycle_id && <p className="text-red-600">El id de la motocicleta es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Id cliente</label>
          <input type="number" {...register("customer_id", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.customer_id && <p className="text-red-600">El id del cliente es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <input type="string" {...register("status", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.status && <p className="text-red-600">El estado es obligatorio</p>}
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Guardar Orden
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
