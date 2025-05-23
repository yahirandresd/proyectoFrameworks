import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getIssueById, updateIssue } from "../../services/issueService";
import { Issue } from "../../models/Issue";
import Swal from "sweetalert2";

const EditIssue: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Issue>();

  useEffect(() => {
    const fetchIssue = async () => {
      if (!id) return;

      const issue = await getIssueById(Number(id));
      if (!issue) {
        navigate("/", { replace: true });
        setTimeout(() => {
          Swal.fire({title:"asunto no encontrado",icon: "error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
        }, 0);
        return;
      }

      // Asegúrate de convertir la fecha a formato ISO para usarla en el input de tipo "date"
      reset({
        ...issue,
        date_reported: new Date(issue.date_reported).toISOString().split("T")[0] as unknown as Date
      });
    };

    fetchIssue();
  }, [id, navigate, reset]);

  const onSubmit = async (data: Issue) => {
    if (!id) return;
    try {
      const updated = await updateIssue(Number(id), data);
      if (updated) {
        Swal.fire({title:"asunto actualizado con éxito",icon:"success",confirmButtonText:"Aceptar",confirmButtonColor: "#28a745"});
        navigate("/list-Issues");
      } else {
        Swal.fire({title:"Error actualizando asunto",icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
      }
    } catch (error) {
      console.error("Error actualizando asunto:", error);
      Swal.fire({title:"Error actualizando asunto",icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Incidencia</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID de Motocicleta</label>
          <input type="number" {...register("motorcycle_id", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea {...register("description")} className="mt-1 block w-full border rounded p-2" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Incidencia</label>
          <input {...register("issue_type")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Reportada</label>
          <input type="date" {...register("date_reported")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select {...register("status")} className="mt-1 block w-full border rounded p-2">
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En progreso</option>
            <option value="resuelto">Resuelto</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Incidencia
        </button>
      </form>
    </div>
  );
};

export default EditIssue;
