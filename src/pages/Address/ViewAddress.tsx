import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAddressById } from "../../services/addressService";
import { Address } from "../../models/Address";

const ViewAddress: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getAddressById(Number(id)).then(data => {
      setAddress(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Cargando dirección...
      </div>
    );

  if (!address)
    return (
      <div className="text-center text-red-500">
        No se encontró la dirección.
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle de la Dirección</h2>
      <p className="mb-2">
        <strong>ID:</strong> {address.id}
      </p>
      <p className="mb-2">
        <strong>Calle:</strong> {address.street}
      </p>
      <p className="mb-2">
        <strong>Ciudad:</strong> {address.city}
      </p>
      <p className="mb-2">
        <strong>Estado:</strong> {address.state}
      </p>
      <p className="mb-2">
        <strong>Código Postal:</strong> {address.postal_code}
      </p>
      <p className="mb-2">
        <strong>Información Adicional:</strong> {address.additional_info}
      </p>
      <p className="mb-4">
        <strong>ID de la Orden:</strong> {address.order_id}
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

export default ViewAddress;
