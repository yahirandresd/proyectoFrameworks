import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMotorcycleById } from "../../services/motorcycleService";
import { Motorcycle } from "../../models/Motorcycle";
import { CheckCircle, XCircle } from "lucide-react";

const ViewMotorcycle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getMotorcycleById(Number(id)).then(data => {
      setMotorcycle(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Cargando motocicleta...
      </div>
    );

  if (!motorcycle)
    return (
      <div className="text-center text-red-500">
        No se encontró la motocicleta.
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle de la Motocicleta</h2>
      <p className="mb-2">
        <strong>ID:</strong> {motorcycle.id}
      </p>
      <p className="mb-2">
        <strong>Placa:</strong> {motorcycle.license_plate}
      </p>
      <p className="mb-2">
        <strong>Marca:</strong> {motorcycle.brand}
      </p>
      <p className="mb-2">
        <strong>Año:</strong> {motorcycle.year}
      </p>
      <p className="mb-4 flex items-center">
        <strong className="mr-2">Estado:</strong>
        {motorcycle.status.toLowerCase() === "activo" ? (
          <span className="flex items-center text-green-600">
            <CheckCircle className="mr-1" size={20} /> Activo
          </span>
        ) : (
          <span className="flex items-center text-red-600">
            <XCircle className="mr-1" size={20} /> Inactivo
          </span>
        )}
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

export default ViewMotorcycle;
