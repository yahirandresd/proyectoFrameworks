import React from "react";
import { useForm } from "react-hook-form";
import { createMotorcycle } from "../../services/motorcycleService"; // Ajusta la ruta si es necesario
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
interface MotorcycleFormValues {
    id: number;
    license_plate: string;
    brand: string;
    year: number;
    status: string;
}

const CreateMotorcycle: React.FC = () => {
  const navigate=useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MotorcycleFormValues>();

 const onSubmit = async (data: MotorcycleFormValues) => {
       try {
         const result = await createMotorcycle(data); // Hace POST al backend
         if (result) {
           Swal.fire({title:"motocicleta creado con éxito",icon:"success",confirmButtonText:"Aceptar",confirmButtonColor: "#28a745"});
           navigate("/list-motorcycles");
         } else {
           Swal.fire({title:"Error al crear el motocicleta", icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
         }
       } catch (error) {
         Swal.fire({title:"Error inesperado",icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
         console.error(error);
       }
     };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Crear Motocicleta</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Matricula</label>
          <input type="string"{...register("license_plate", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.license_plate && <p className="text-red-600">La matricula es obligatoria</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Marca</label>
          <input type="string" {...register("brand", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.brand && <p className="text-red-600">El email es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Año</label>
          <input type="number" {...register("year", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.year && <p className="text-red-600">El año es obligatorio</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <input type="string" {...register("status", { required: true })} className="mt-1 block w-full border rounded p-2" />
          {errors.status && <p className="text-red-600">El estado es obligatorio</p>}
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Guardar Motocicleta
        </button>
      </form>
    </div>
  );
};

export default CreateMotorcycle;
