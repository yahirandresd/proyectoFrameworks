import React from "react";
import { useForm } from "react-hook-form";
import { createPhoto } from "../../services/photoService"; // Ajusta la ruta si es necesario
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
interface PhotoFormValues {
    image_url: string;
    caption: string;
    taken_at: Date; 
    issue_id: number; // ID de la issue asociada a la foto
}

const CreatePhoto: React.FC = () => {
  const navigate= useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PhotoFormValues>();

  const onSubmit = async (data: PhotoFormValues) => {
    try {
      const result = await createPhoto(data); // Hace POST al backend
      if (result) {
        Swal.fire({ title: "foto creado con éxito", icon: "success", confirmButtonText: "Aceptar", confirmButtonColor: "#28a745" });
        navigate("/list-photos");
      } else {
        Swal.fire({ title: "Error al crear el foto", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
      }
    } catch (error) {
      Swal.fire({ title: "Error inesperado", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Crear foto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tomada en</label>
          <input type="date" {...register("taken_at", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.taken_at && <p className="text-red-600">Esta fecha es obligatoria</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Url imagen</label>
          <input type="string" {...register("image_url", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.image_url && <p className="text-red-600">El url de la imagen es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Id asunto</label>
          <input type="number" {...register("issue_id", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.issue_id && <p className="text-red-600">El id del asunto es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitulo</label>
          <input type="string" {...register("caption", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.caption && <p className="text-red-600">El subtitulo es obligatorio</p>}
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Guardar foto
        </button>
      </form>
    </div>
  );
};

export default CreatePhoto;
