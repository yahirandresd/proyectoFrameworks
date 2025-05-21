// src/pages/Motorcycle/ViewMotorcycle.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMotorcycleById } from "../../services/motorcycleService";
import { Motorcycle } from "../../models/Motorcycle";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { CheckCircle, XCircle } from "lucide-react";

const ViewMotorcycle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Swal.fire({
      title: "Cargando motocicleta...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    getMotorcycleById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró la motocicleta.",
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
          setMotorcycle(data);
          Swal.close();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar la motocicleta.",
          confirmButtonText: "Volver",
          confirmButtonColor: "#d33",
        }).then(() => navigate(-1));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return null; // Loading mostrado con Swal

  if (!motorcycle) return null; // No encontrado mostrado con Swal

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
