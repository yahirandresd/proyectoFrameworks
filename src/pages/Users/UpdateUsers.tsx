import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../services/userService";
import Swal from "sweetalert2";
interface UserFormValues {
  name: string;
  email: string;
  password: string;
  age: number;
  city: string;
  phone: string;
  is_active: boolean;
}

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<UserFormValues>();
  const [loading,] = useState(true);
  //const [Swal.fireShown, setSwal.fireShown] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      const user = await getUserById(Number(id));
      if (!user) {
        // Evita mostrar Swal.fire múltiples veces redireccionando primero
        navigate("/", { replace: true });
        setTimeout(() => {
          Swal.fire({ title: "usuario no encontrada", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
        }, 0);
        return;
      }
      reset({
        name: user.name,
        email: user.email,
        password: "",
        age: user.age,
        city: user.city,
        phone: user.phone,
        is_active: user.is_active,
      });
    };

    fetchUser();
  }, [id, navigate, reset]);

  const onSubmit = async (data: UserFormValues) => {
    if (!id) return;
    try {
      const updated = await updateUser(Number(id), data);
      if (updated) {
        Swal.fire({ title: "usuario actualizado con éxito", icon: "success", confirmButtonText: "Aceptar", confirmButtonColor: "#28a745" });
        navigate("/list-users");
      } else {
        Swal.fire({ title: "Error actualizando usuario", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
      }
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      Swal.fire({ title: "Error actualizando usuario", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
    }
  };

  if (loading) return <div>Cargando usuario...</div>;

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input {...register("name")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" {...register("email")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" {...register("password")} className="mt-1 block w-full border rounded p-2" placeholder="Nueva contraseña (opcional)" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input type="number" {...register("age", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ciudad</label>
          <input {...register("city")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input {...register("phone")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" {...register("is_active")} id="is_active" className="mr-2" />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Activo</label>
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Usuario
        </button>
      </form>
    </div>
  );
};

export default EditUser;
