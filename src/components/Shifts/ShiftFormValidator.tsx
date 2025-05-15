// src/components/shifts/ShiftFormValidator.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Shift } from "../../models/Shift";

// Esquema de validación
const schema = yup.object().shape({
  start_time: yup.date().required("La hora de inicio es obligatoria").typeError("Debe ser una fecha válida"),
  end_time: yup.date()
    .required("La hora de fin es obligatoria")
    .typeError("Debe ser una fecha válida")
    .min(yup.ref("start_time"), "La hora de fin debe ser posterior a la hora de inicio"),
  status: yup.string().required("El estado es obligatorio").max(50),
});

interface Props {
  initialData?: Shift;
  onSubmit: (data: Omit<Shift, "id">) => void;
}

const ShiftFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Shift, "id">>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      start_time: new Date(),
      end_time: new Date(),
      status: "",
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Hora de Inicio</label>
        <input
          type="datetime-local"
          {...register("start_time")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.start_time && (
          <p className="mt-1 text-sm text-red-600">{errors.start_time.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hora de Fin</label>
        <input
          type="datetime-local"
          {...register("end_time")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.end_time && (
          <p className="mt-1 text-sm text-red-600">{errors.end_time.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <input
          {...register("status")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        {initialData ? "Actualizar" : "Crear"} Turno
      </button>
    </form>
  );
};

export default ShiftFormValidator;
