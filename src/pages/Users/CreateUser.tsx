import React from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../../services/userService"; // Ajusta la ruta si es necesario

interface UserFormValues {
  name: string;
  email: string;
  password: string;
  age: number;
  city: string;
  phone: string;
  is_active: boolean;
}

const CreateUser: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormValues>();

  const onSubmit = async (data: UserFormValues) => {
    try {
      const result = await createUser(data); // Hace POST al backend
      if (result) {
        alert("✅ Usuario creado con éxito");
        reset();
      } else {
        alert("❌ Error al crear el usuario");
      }
    } catch (error) {
      alert("❌ Error inesperado");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Crear Usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input type ="name"{...register("name", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.name && <p className="text-red-600">El nombre es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" {...register("email", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.email && <p className="text-red-600">El email es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" {...register("password", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.password && <p className="text-red-600">La contraseña es obligatoria</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input type="number" {...register("age", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.age && <p className="text-red-600">La edad es obligatoria</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ciudad</label>
          <input {...register("city", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.city && <p className="text-red-600">La ciudad es obligatoria</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input {...register("phone", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.phone && <p className="text-red-600">El teléfono es obligatorio</p>}
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("is_active")} />
          <label className="text-sm">¿Está activo?</label>
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Guardar Usuario
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
