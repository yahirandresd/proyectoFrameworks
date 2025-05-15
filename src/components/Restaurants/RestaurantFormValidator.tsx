import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Restaurant } from "../../models/Restaurant";

// Esquema de validación
const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio").max(100),
  address: yup.string().required("La dirección es obligatoria").max(200),
  phone: yup
    .string()
    .required("El teléfono es obligatorio")
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(8, "Mínimo 8 caracteres")
    .max(15, "Máximo 15 caracteres"),
  email: yup
    .string()
    .required("El email es obligatorio")
    .email("Ingrese un email válido")
    .max(100),
});

interface Props {
  initialData?: Restaurant;
  onSubmit: (data: Omit<Restaurant, "id">) => void;
}

const RestaurantFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Restaurant, "id">>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: "",
      address: "",
      phone: "",
      email: "",
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
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dirección
        </label>
        <input
          {...register("address")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          {...register("phone")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        {initialData ? "Actualizar" : "Crear"} Restaurante
      </button>
    </form>
  );
};

export default RestaurantFormValidator;