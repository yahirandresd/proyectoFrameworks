import React from "react";
import { useForm } from "react-hook-form";
import { createIssue } from "../../services/issueService"; // Ajusta la ruta si es necesario

interface IssueFormValues {
    motorcycle_id: number;
    description: string;
    issue_type: string;
    date_reported: Date; 
    status: string;
}

const CreateIssue: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IssueFormValues>();

  const onSubmit = async (data: IssueFormValues) => {
    try {
      const result = await createIssue(data); // Hace POST al backend
      if (result) {
        alert("✅ Asunto creado con éxito");
        reset();
      } else {
        alert("❌ Error al crear el Asunto");
      }
    } catch (error) {
      alert("❌ Error inesperado");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Crear Asunto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Id motocicleta</label>
          <input type ="number"{...register("motorcycle_id", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.motorcycle_id && <p className="text-red-600">El id de la motocicleta es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripcion</label>
          <input type ="string"{...register("description", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.description && <p className="text-red-600">La descripcion es obligatoria</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de asunto</label>
          <input type="string" {...register("issue_type", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.issue_type && <p className="text-red-600">El tipo es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha reportada</label>
          <input type="date" {...register("date_reported", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.date_reported && <p className="text-red-600">La fecha es obligatoria</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <input type="string" {...register("status", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.status && <p className="text-red-600">El estado es obligatorio</p>}
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Guardar Asunto
        </button>
      </form>
    </div>
  );
};

export default CreateIssue;
