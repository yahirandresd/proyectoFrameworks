// src/pages/Driver/ViewDriver.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDriverById } from "../../services/driverService";
import { Driver } from "../../models/Driver";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { CheckCircle, XCircle } from "lucide-react";

const ViewDriver: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Swal.fire({
      title: "Cargando conductor...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    getDriverById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró el conductor.",
            confirmButtonText: "Volver",
            confirmButtonColor: "#3085d6",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(-1);
            }
          });
        } else {
          setDriver(data);
          Swal.close();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar el conductor.",
          confirmButtonText: "Volver",
          confirmButtonColor: "#d33",
        }).then(() => navigate(-1));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return null; // La carga la maneja Swal

  if (!driver) return null; // El no encontrado también lo maneja Swal

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
