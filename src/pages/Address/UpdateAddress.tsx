import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getAddressById, updateAddress } from "../../services/addressService";
import { Address } from "../../models/Address";

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
          alert("Dirección no encontrada");
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
        alert("Dirección actualizada con éxito");
        navigate("/addresses");
      } else {
        alert("Error actualizando dirección");
      }
    } catch (error) {
      console.error("Error actualizando dirección:", error);
      alert("Error actualizando dirección");
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
