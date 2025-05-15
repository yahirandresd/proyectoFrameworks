import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Order } from "../../models/Order";

// Esquema de validación
const schema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("La cantidad debe ser un número")
    .required("La cantidad es obligatoria")
    .min(1, "Debe ser al menos 1"),
  total_price: yup
    .number()
    .typeError("El precio total debe ser un número")
    .required("El precio total es obligatorio")
    .min(0, "No puede ser negativo"),
  status: yup
    .string()
    .required("El estado es obligatorio")
    .max(30, "Máximo 30 caracteres"),
});

interface Props {
  initialData?: Omit<Order, "id">;
  onSubmit: (data: Omit<Order, "id">) => void;
}

const OrderFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Order, "id">>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      quantity: 1,
      total_price: 0,
      status: "",
    },
  });

  // Resetear formulario si initialData cambia
  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Cantidad</label>
        <input
          type="number"
          {...register("quantity")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Precio Total</label>
        <input
          type="number"
          step="0.01"
          {...register("total_price")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.total_price && (
          <p className="mt-1 text-sm text-red-600">{errors.total_price.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <input
          {...register("status")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        {initialData ? "Actualizar" : "Crear"} Orden
      </button>
    </form>
  );
};

export default OrderFormValidator;