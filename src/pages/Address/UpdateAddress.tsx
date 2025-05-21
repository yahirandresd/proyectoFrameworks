import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getAddressById, updateAddress } from "../../services/addressService";
import { Address } from "../../models/Address";
import Swal from "sweetalert2";

const EditAddress: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Address>();

  useEffect(() => {
    const fetchAddress = async () => {
      if (!id) return;

      const address = await getAddressById(Number(id));
      if (!address) {
        navigate("/", { replace: true });
        setTimeout(() => {
          Swal.fire({title:"Dirección no encontrada", icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
        }, 0);
        return;
      }

      reset(address);
    };

    fetchAddress();
  }, [id, navigate, reset]);

  const onSubmit = async (data: Address) => {
    if (!id) return;
    try {
      const updated = await updateAddress(Number(id), data);
      if (updated) {
        Swal.fire({title:"Dirección actualizada con éxito",icon:"success",confirmButtonText:"Aceptar",confirmButtonColor: "#28a745"});
        navigate("/list-address");
      } else {
        Swal.fire({title:"Error actualizando dirección",icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
      }
    } catch (error) {
      console.error("Error actualizando dirección:", error);
      Swal.fire({title:"Error actualizando dirección",icon: "error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Dirección</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Calle</label>
          <input {...register("street")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ciudad</label>
          <input {...register("city")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <input {...register("state")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Código Postal</label>
          <input {...register("postal_code")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Información Adicional</label>
          <textarea {...register("additional_info")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Dirección
        </button>
      </form>
    </div>
  );
};

export default EditAddress;
