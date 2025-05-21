import React from "react";
import { useForm } from "react-hook-form";
import { createOrder } from "../../services/orderService"; // Ajusta la ruta si es necesario
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface OrderFormValues {
  quantity: number;
  motorcycle_id: number;
  customer_id: number;
  menu_id: number;
}


const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<OrderFormValues>();

  const onSubmit = async (data: OrderFormValues) => {
    try {
      const result = await createOrder({ ...data, status: "PENDIENTE" }); // <-- status fijo
      if (result) {
        Swal.fire({
          title: "Orden creada con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#28a745"
        });
        navigate("/list-orders");
      } else {
        Swal.fire({
          title: "Error al crear la orden",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#dc3545"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error inesperado",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#dc3545"
      });
      console.error(error);
    }
  };
  

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Crear Orden</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cantidad</label>
          <input
            type="number"
            {...register("quantity", { required: true })}
            className="mt-1 block w-full border rounded p-2"
          />
          {errors.quantity && <p className="text-red-600">La cantidad es obligatoria</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID Motocicleta</label>
          <input
            type="number"
            {...register("motorcycle_id", { required: true })}
            className="mt-1 block w-full border rounded p-2"
          />
          {errors.motorcycle_id && <p className="text-red-600">El ID de la motocicleta es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID Cliente</label>
          <input
            type="number"
            {...register("customer_id", { required: true })}
            className="mt-1 block w-full border rounded p-2"
          />
          {errors.customer_id && <p className="text-red-600">El ID del cliente es obligatorio</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ID Menú</label>
          <input
            type="number"
            {...register("menu_id", { required: true })}
            className="mt-1 block w-full border rounded p-2"
          />
          {errors.menu_id && <p className="text-red-600">El ID del menú es obligatorio</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Crear Orden
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
