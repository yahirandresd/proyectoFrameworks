// src/pages/Shift/ViewShift.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShiftById } from "../../services/shiftService";
import { Shift } from "../../models/Shift";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss"; // Asegúrate de importar estilos si no están globales
import { Eye } from "lucide-react";

const ViewShift: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shift, setShift] = useState<Shift | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getShiftById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró el restaurante.",
            confirmButtonText: "Volver",
            confirmButtonColor: "#3085d6", // color de fondo
            customClass: {
                confirmButton: 'swal2-custom-confirm', // tu clase personalizada
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            }).then((result) => {
            if (result.isConfirmed) {
                navigate(-1);
            }
            });
        } else {
          setShift(data);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar el turno.",
          confirmButtonText: "Volver",
        }).then(() => navigate(-1));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Cargando turno...
      </div>
    );
  }

  if (!shift) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle del Turno</h2>

      <div className="mb-2">
        <strong>ID:</strong> {shift.id}
      </div>

      <div className="mb-2">
        <strong>Hora de inicio:</strong>{" "}
        {new Date(shift.start_time).toLocaleString()}
      </div>

      <div className="mb-2">
        <strong>Hora de fin:</strong>{" "}
        {new Date(shift.end_time).toLocaleString()}
      </div>

      <div className="mb-2">
        <strong>Estado:</strong> {shift.status}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div>
          <strong>ID del Conductor:</strong> {shift.driver_id}
        </div>
        <button
            onClick={() => navigate(`/view-driver/${shift.driver_id}`)}
            className="flex items-center text-blue-600 hover:text-blue-800"
        >
            <Eye size={18} className="mr-1" />
            Mostrar
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <strong>ID de la Motocicleta:</strong> {shift.motorcycle_id}
        </div>
        <button
          onClick={() => navigate(`/view-motorcycle/${shift.motorcycle_id}`)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <Eye size={18} className="mr-1" />
          Mostrar
        </button>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Volver
      </button>
    </div>
  );
};

export default ViewShift;
