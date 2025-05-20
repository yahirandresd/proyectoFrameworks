import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../../services/customerService";
import { Customer } from "../../models/Customer";

const EditCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Customer>();

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;

      const customer = await getCustomerById(Number(id));
      if (!customer) {
        navigate("/", { replace: true });
        setTimeout(() => {
          alert("Cliente no encontrado");
        }, 0);
        return;
      }

      reset(customer);
    };

    fetchCustomer();
  }, [id, navigate, reset]);

  const onSubmit = async (data: Customer) => {
    if (!id) return;
    try {
      const updated = await updateCustomer(Number(id), data);
      if (updated) {
        alert("Cliente actualizado con éxito");
        navigate("/customers");
      } else {
        alert("Error actualizando cliente");
      }
    } catch (error) {
      console.error("Error actualizando cliente:", error);
      alert("Error actualizando cliente");
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input {...register("name")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" {...register("email")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input {...register("phone")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Cliente
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;
