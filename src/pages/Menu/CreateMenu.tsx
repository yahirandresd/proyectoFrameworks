import React from "react";
import { useForm } from "react-hook-form";
import { createMenu } from "../../services/menuService"; // Ajusta la ruta si es necesario

interface UserFormValues {
    price: number; // Usamos "number" para precios con decimales
    availability: boolean; // Disponibilidad del menú
}

const CreateMenu: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormValues>();

  const onSubmit = async (data: UserFormValues) => {
    try {
      const result = await createMenu(data); // Hace POST al backend
      if (result) {
        alert("✅ Menu creado con éxito");
        reset();
      } else {
        alert("❌ Error al crear el Menu");
      }
    } catch (error) {
      alert("❌ Error inesperado");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Crear Menu</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio</label>
          <input type ="price"{...register("price", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.price && <p className="text-red-600">El precio es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Disponibilidad</label>
          <input type="availability" {...register("availability", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.availability && <p className="text-red-600">La disponibilidad del menu es obligatoria</p>}
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Guardar Menu
        </button>
      </form>
    </div>
  );
};

export default CreateMenu;
