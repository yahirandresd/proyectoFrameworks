import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Role } from "../../models/Role";

// Esquema de validación
const schema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre del rol es obligatorio")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .default(""), // Asegura un valor por defecto
});

interface Props {
  initialData?: Role;
  onSubmit: (data: Omit<Role, "id">) => void;
}

const RoleFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Role, "id">>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      nombre: "", // Asegura que 'nombre' sea un string por defecto
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
        <label className="block text-sm font-medium text-gray-700">
          Nombre del Rol
        </label>
        <input
          type="text"
          {...register("nombre")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ej: Administrador"
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? "Actualizar Rol" : "Crear Rol"}
        </button>
      </div>
    </form>
  );
};

export default RoleFormValidator;