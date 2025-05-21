import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantById, updateRestaurant } from "../../services/restaurantService";
import { Restaurant } from "../../models/Restaurant";
import Swal from "sweetalert2";

const EditRestaurant: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Restaurant>();

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!id) return;

      const restaurant = await getRestaurantById(Number(id));
      if (!restaurant) {
        navigate("/", { replace: true });
        setTimeout(() => {
          Swal.fire({ title: "restaurante no encontrada", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
        }, 0);
        return;
      }

      reset(restaurant);
    };

    fetchRestaurant();
  }, [id, navigate, reset]);

  const onSubmit = async (data: Restaurant) => {
    if (!id) return;
    try {
      const updated = await updateRestaurant(Number(id), data);
      if (updated) {
        Swal.fire({ title: "restaurante actualizado con éxito", icon: "success", confirmButtonText: "Aceptar", confirmButtonColor: "#28a745" });
        navigate("/list-restaurants");
      } else {
        Swal.fire({ title: "Error actualizando restaurante", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
      }
    } catch (error) {
      console.error("Error actualizando restaurante:", error);
      Swal.fire({ title: "Error actualizando restaurante", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Restaurante</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input {...register("name")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input {...register("address")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input {...register("phone")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" {...register("email")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Restaurante
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
