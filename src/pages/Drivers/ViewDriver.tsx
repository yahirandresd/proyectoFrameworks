import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDriverById } from "../../services/driverService";
import { Driver } from "../../models/Driver";
import { CheckCircle, XCircle } from "lucide-react";

const ViewDriver: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getDriverById(Number(id)).then(data => {
      setDriver(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Cargando conductor...
      </div>
    );

  if (!driver)
    return (
      <div className="text-center text-red-500">
        No se encontró el conductor.
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle del Conductor</h2>
      <p className="mb-2">
        <strong>ID:</strong> {driver.id}
      </p>
      <p className="mb-2">
        <strong>Nombre:</strong> {driver.name}
      </p>
      <p className="mb-2">
        <strong>Licencia:</strong> {driver.license_number}
      </p>
      <p className="mb-2">
        <strong>Teléfono:</strong> {driver.phone}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {driver.email}
      </p>
      <p className="mb-4 flex items-center">
        <strong className="mr-2">Estado:</strong>
        {driver.status.toLowerCase() === "activo" ? (
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

export default ViewDriver;
