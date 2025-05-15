import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User } from "../../models/User";

// Esquema de validación
const schema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .max(50, "El nombre no puede exceder los 50 caracteres"),
  email: yup
    .string()
    .required("El correo electrónico es obligatorio")
    .email("Debe ser un correo válido"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  age: yup
    .number()
    .typeError("La edad debe ser un número")
    .required("La edad es obligatoria")
    .min(1, "Edad no válida")
    .max(120, "Edad no válida"),
  city: yup
    .string()
    .required("La ciudad es obligatoria"),
  phone: yup
    .string()
    .required("El número de teléfono es obligatorio")
    .matches(/^\d{7,15}$/, "El número debe tener entre 7 y 15 dígitos"),
  is_active: yup
    .boolean()
    .required("El estado activo es obligatorio"),
});

interface Props {
  initialData?: User;
  onSubmit: (data: Omit<User, "id" | "token">) => void;
}

const UserFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<User, "id" | "token">>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: "",
      email: "",
      password: "",
      age: 0,
      city: "",
      phone: "",
      is_active: true,
    },
  });

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
          type="text"
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Correo</label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          {...register("password")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Edad</label>
        <input
          type="number"
          {...register("age")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.age && <p className="text-sm text-red-600">{errors.age.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ciudad</label>
        <input
          type="text"
          {...register("city")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.city && <p className="text-sm text-red-600">{errors.city.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="text"
          {...register("phone")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <select
          {...register("is_active")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        {errors.is_active && <p className="text-sm text-red-600">{errors.is_active.message}</p>}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </div>
    </form>
  );
};

export default UserFormValidator;
