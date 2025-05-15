// src/components/photos/PhotoFormValidator.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Photo } from "../../models/Photo";

// Esquema de validación
const schema = yup.object().shape({
  image_url: yup.string().required("La URL de la imagen es obligatoria").url("Debe ser una URL válida"),
  caption: yup.string().required("El título es obligatorio").max(200),
  taken_at: yup.date().required("La fecha es obligatoria").typeError("Debe ser una fecha válida"),
});

interface Props {
  initialData?: Photo;
  onSubmit: (data: Omit<Photo, "id">) => void;
}

const PhotoFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Photo, "id">>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      image_url: "",
      caption: "",
      taken_at: new Date(),
    },
  });

  // Resetear formulario si initialData cambia
  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
        <input
          {...register("image_url")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.image_url && (
          <p className="mt-1 text-sm text-red-600">{errors.image_url.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          {...register("caption")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.caption && (
          <p className="mt-1 text-sm text-red-600">{errors.caption.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          {...register("taken_at")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.taken_at && (
          <p className="mt-1 text-sm text-red-600">{errors.taken_at.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        {initialData ? "Actualizar" : "Crear"} Foto
      </button>
    </form>
  );
};

export default PhotoFormValidator;
