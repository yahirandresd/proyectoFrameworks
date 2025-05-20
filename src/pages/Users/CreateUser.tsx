import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  role: yup.string().required("El rol es obligatorio"),
});

interface UserFormValues {
  name: string;
  email: string;
  role: string;
}

const CreateUser: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: UserFormValues) => {
    // Aquí iría la lógica para guardar el usuario
    alert("Usuario creado: " + JSON.stringify(data));
    reset();
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Crear Usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input {...register("name")} className="mt-1 block w-full border rounded p-2" />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" {...register("email")} className="mt-1 block w-full border rounded p-2" />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <input {...register("role")} className="mt-1 block w-full border rounded p-2" />
          {errors.role && <p className="text-red-600">{errors.role.message}</p>}
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Guardar Usuario
        </button>
      </form>
    </div>
  );
};

export default CreateUser;