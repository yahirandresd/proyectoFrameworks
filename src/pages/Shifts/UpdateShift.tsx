import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Shift } from "../../models/Shift";
import { getShiftById, updateShift } from "../../services/shiftService";
import Swal from "sweetalert2";

const EditShift: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Shift>();

  useEffect(() => {
    const fetchShift = async () => {
      if (!id) return;
      const shift = await getShiftById(Number(id));
      if (!shift) {
        navigate("/", { replace: true });
        setTimeout(() => {
          Swal.fire({ title: "turno no encontrada", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
        }, 0);
        return;
      }

      reset({
        ...shift,
        start_time: new Date(shift.start_time).toISOString().slice(0, 16),
        end_time: new Date(shift.end_time).toISOString().slice(0, 16),
      } as any); // Convertimos fechas a string para datetime-local
    };

    fetchShift();
  }, [id, navigate, reset]);

  const onSubmit = async (data: any) => {
    if (!id) return;
    try {
      const payload: Shift = {
        ...data,
        start_time: new Date(data.start_time),
        end_time: new Date(data.end_time),
      };
      const updated = await updateShift(Number(id), payload);
      if (updated) {
        Swal.fire({ title: "turno actualizado con éxito", icon: "success", confirmButtonText: "Aceptar", confirmButtonColor: "#28a745" });
        navigate("/list-shifts");
      } else {
        Swal.fire({ title: "Error actualizando turno", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
      }
    } catch (error) {
      console.error("Error actualizando turno:", error);
      Swal.fire({ title: "Error actualizando turno", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Turno</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hora de Inicio</label>
          <input type="datetime-local" {...register("start_time")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hora de Fin</label>
          <input type="datetime-local" {...register("end_time")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <input {...register("status")} className="mt-1 block w-full border rounded p-2" placeholder="ej. activo, finalizado" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID del Conductor</label>
          <input type="number" {...register("driver_id", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID de la Motocicleta</label>
          <input type="number" {...register("motorcycle_id", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Turno
        </button>
      </form>
    </div>
  );
};

export default EditShift;
