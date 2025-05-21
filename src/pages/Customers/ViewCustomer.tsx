import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById } from "../../services/customerService";
import { Customer } from "../../models/Customer";

const ViewCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getCustomerById(Number(id)).then(data => {
      setCustomer(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Cargando cliente...
      </div>
    );

  if (!customer)
    return (
      <div className="text-center text-red-500">
        No se encontró el cliente.
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Volver
        </button>
      </div>
    );

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle del Cliente</h2>
      <p className="mb-2">
        <strong>ID:</strong> {customer.id}
      </p>
      <p className="mb-2">
        <strong>Nombre:</strong> {customer.name}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {customer.email}
      </p>
      <p className="mb-4">
        <strong>Teléfono:</strong> {customer.phone}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Volver
      </button>
    </div>
  );
};

export default ViewCustomer;
