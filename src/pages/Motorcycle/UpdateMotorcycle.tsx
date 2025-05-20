import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getMotorcycleById, updateMotorcycle } from "../../services/motorcycleService";
import { Motorcycle } from "../../models/Motorcycle";

const EditMotorcycle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Motorcycle>();

  useEffect(() => {
    const fetchMotorcycle = async () => {
      if (!id) return;

      const moto = await getMotorcycleById(Number(id));
      if (!moto) {
        navigate("/", { replace: true });
        setTimeout(() => {
          alert("Motocicleta no encontrada");
        }, 0);
        return;
      }

      reset(moto);
    };

    fetchMotorcycle();
  }, [id, navigate, reset]);

  const onSubmit = async (data: Motorcycle) => {
    if (!id) return;
    try {
      const updated = await updateMotorcycle(Number(id), data);
      if (updated) {
        alert("Motocicleta actualizada con éxito");
        navigate("/motorcycles");
      } else {
        alert("Error actualizando motocicleta");
      }
    } catch (error) {
      console.error("Error actualizando motocicleta:", error);
      alert("Error actualizando motocicleta");
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Motocicleta</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Placa</label>
          <input {...register("license_plate")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Marca</label>
          <input {...register("brand")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Año</label>
          <input type="number" {...register("year", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select {...register("status")} className="mt-1 block w-full border rounded p-2">
            <option value="disponible">Disponible</option>
            <option value="en_mantenimiento">En mantenimiento</option>
            <option value="fuera_de_servicio">Fuera de servicio</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Motocicleta
        </button>
      </form>
    </div>
  );
};

export default EditMotorcycle;
