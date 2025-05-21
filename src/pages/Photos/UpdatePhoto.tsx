import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getPhotoById, updatePhoto } from "../../services/photoService";
import { Photo } from "../../models/Photo";
import Swal from "sweetalert2";
const EditPhoto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Photo>();

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!id) return;

      const photo = await getPhotoById(Number(id));
      if (!photo) {
        navigate("/", { replace: true });
        setTimeout(() => {
          Swal.fire({title:"foto no encontrada",icon: "error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
        }, 0);
        return;
      }

      // Convertimos la fecha a formato ISO para el input datetime-local
      reset({
        ...photo,
        taken_at: new Date(photo.taken_at).toISOString().slice(0, 16),
      } as any); // Forzamos tipo por diferencia en Date e input string
    };

    fetchPhoto();
  }, [id, navigate, reset]);

  const onSubmit = async (data: any) => {
    if (!id) return;
    try {
      const payload: Photo = {
        ...data,
        taken_at: new Date(data.taken_at), // Convertimos el string ISO a Date
      };
      const updated = await updatePhoto(Number(id), payload);
          if (updated) {
              Swal.fire({title:"foto actualizado con éxito",icon:"success",confirmButtonText:"Aceptar",confirmButtonColor: "#28a745"});
              navigate("/list-photos");
            } else {
              Swal.fire({title:"Error actualizando foto",icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
            }
          } catch (error) {
            console.error("Error actualizando foto:", error);
            Swal.fire({title:"Error actualizando foto",icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
          }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Foto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
          <input {...register("image_url")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <input {...register("caption")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de la Foto</label>
          <input
            type="datetime-local"
            {...register("taken_at")}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID de Issue Asociada</label>
          <input type="number" {...register("issue_id", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Foto
        </button>
      </form>
    </div>
  );
};

export default EditPhoto;
