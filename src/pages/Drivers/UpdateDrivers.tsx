import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getDriverById, updateDriver } from "../../services/driverService";
import { Driver } from "../../models/Driver";
import Swal from "sweetalert2";
const EditDriver: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Driver>();

  useEffect(() => {
    const fetchDriver = async () => {
      if (!id) return;

      const driver = await getDriverById(Number(id));
      if (!driver) {
        navigate("/", { replace: true });
        setTimeout(() => {
          Swal.fire({title:"Conductor no encontrado",icon: "error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
        }, 0);
        return;
      }

      reset(driver);
    };

    fetchDriver();
  }, [id, navigate, reset]);

  const onSubmit = async (data: Driver) => {
    if (!id) return;
    try {
      const updated = await updateDriver(Number(id), data);
      if (updated) {
        Swal.fire({title:"Conductor actualizado con éxito",icon:"success",confirmButtonText:"Aceptar",confirmButtonColor: "#28a745"});
        navigate("/list-drivers");
      } else {
        Swal.fire({title:"Error actualizando conductor",icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
      }
    } catch (error) {
      console.error("Error actualizando conductor:", error);
      Swal.fire({title:"Error actualizando conductor",icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Conductor</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input {...register("name")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Número de Licencia</label>
          <input {...register("license_number")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input {...register("phone")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" {...register("email")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select {...register("status")} className="mt-1 block w-full border rounded p-2">
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Conductor
        </button>
      </form>
    </div>
  );
};

export default EditDriver;
