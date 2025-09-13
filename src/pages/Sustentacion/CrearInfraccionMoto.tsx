// src/pages/MotorcycleInfringementForm.tsx
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";

import { Motorcycle } from "../../models/Motorcycle";
import { Infringement } from "../../models/Infringements";

import {
  createMotorcycleInfringement,
  updateMotorcycleInfringement,
} from "../../services/MotorcycleInfringements";

import api from "../../interceptors/axiosInterceptor"; // para cargar motos
import apiMock from "../../interceptors/axiosMock"; // para cargar infracciones

interface FormValues {
  motorcycle_id: number;
  infringement_id: number;
  date: string;
}

const schema = yup.object({
  motorcycle_id: yup
    .number()
    .required("Moto obligatoria")
    .moreThan(0, "Seleccione una moto"),
  infringement_id: yup
    .number()
    .required("Infracción obligatoria")
    .moreThan(0, "Seleccione una infracción"),
  date: yup.string().required("Fecha obligatoria"),
});


interface Props {
  isEdit?: boolean;
  defaultValues?: FormValues;
  idToUpdate?: number;
}

export const MotorcycleInfringementForm = ({
  isEdit = false,
  defaultValues,
  idToUpdate,
}: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      motorcycle_id: 0,
      infringement_id: 0,
      date: "",
    },
  });

  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [infringements, setInfringements] = useState<Infringement[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [motoRes, infrRes] = await Promise.all([
          api.get<Motorcycle[]>("/motorcycles"),
          apiMock.get<Infringement[]>("/infringements"),
        ]);
        setMotorcycles(motoRes.data);
        setInfringements(infrRes.data);
      } catch (err) {
        console.error("Error cargando datos:", err);
        Swal.fire("Error", "No se pudieron cargar motos o infracciones", "error");
      }
    };
    loadData();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEdit && idToUpdate) {
        await updateMotorcycleInfringement(idToUpdate, data);
        Swal.fire("Actualizado", "Se actualizó correctamente", "success");
      } else {
        await createMotorcycleInfringement(data);
        Swal.fire("Creado", "Se creó correctamente", "success");
        reset();
      }
    } catch (err) {
      Swal.fire("Error", "Hubo un problema al guardar", "error");
      console.error(err);
    }
  };

  return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="p-6 max-w-xl mx-auto space-y-6 bg-white rounded-lg shadow-lg"
  >
    {/* Moto */}
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700 font-semibold select-none">Moto:</label>
      <Controller
        control={control}
        name="motorcycle_id"
        render={({ field }) => (
          <select
            {...field}
            className={`border rounded-md p-3 w-full transition 
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${errors.motorcycle_id ? "border-red-500 animate-shake" : "border-gray-300"}`}
          >
            <option value={0}>Seleccione una moto</option>
            {motorcycles.map((moto) => (
              <option key={moto.id} value={moto.id}>
                {moto.license_plate} - {moto.brand}
              </option>
            ))}
          </select>
        )}
      />
      {errors.motorcycle_id && (
        <p className="text-red-600 mt-1 text-sm animate-fadeIn">{errors.motorcycle_id.message}</p>
      )}
    </div>

    {/* Infracción */}
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700 font-semibold select-none">Infracción:</label>
      <Controller
        control={control}
        name="infringement_id"
        render={({ field }) => (
          <select
            {...field}
            className={`border rounded-md p-3 w-full transition
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${errors.infringement_id ? "border-red-500 animate-shake" : "border-gray-300"}`}
          >
            <option value={0}>Seleccione una infracción</option>
            {infringements.map((inf) => (
              <option key={inf.id} value={inf.id}>
                {inf.name}
              </option>
            ))}
          </select>
        )}
      />
      {errors.infringement_id && (
        <p className="text-red-600 mt-1 text-sm animate-fadeIn">{errors.infringement_id.message}</p>
      )}
    </div>

    {/* Fecha */}
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700 font-semibold select-none">Fecha:</label>
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <input
            type="date"
            {...field}
            className={`border rounded-md p-3 w-full transition
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${errors.date ? "border-red-500 animate-shake" : "border-gray-300"}`}
          />
        )}
      />
      {errors.date && (
        <p className="text-red-600 mt-1 text-sm animate-fadeIn">{errors.date.message}</p>
      )}
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg
        hover:bg-blue-700 active:scale-95 transition-transform duration-150 shadow-md
        focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {isEdit ? "Actualizar" : "Crear"}
    </button>

    <style jsx>{`
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-6px); }
        40%, 80% { transform: translateX(6px); }
      }
      .animate-shake {
        animation: shake 0.3s ease-in-out;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease forwards;
      }
    `}</style>
  </form>
);

};

export default MotorcycleInfringementForm;
