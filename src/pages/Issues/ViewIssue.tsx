// src/pages/Issue/ViewIssue.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIssueById } from "../../services/issueService";
import { Issue } from "../../models/Issue";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { CheckCircle, XCircle, Eye } from "lucide-react";

const ViewIssue: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Swal.fire({
      title: "Cargando incidencia...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    getIssueById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró la incidencia.",
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
          setIssue(data);
          Swal.close();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar la incidencia.",
          confirmButtonText: "Volver",
          confirmButtonColor: "#d33",
        }).then(() => navigate(-1));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return null; // la carga está manejada por Swal

  if (!issue) return null; // el no encontrado está manejado por Swal

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle de la Incidencia</h2>
      <p className="mb-2">
        <strong>ID:</strong> {issue.id}
      </p>
      <p className="mb-2">
        <strong>Descripción:</strong> {issue.description}
      </p>
      <p className="mb-2">
        <strong>Tipo:</strong> {issue.issue_type}
      </p>
      <p className="mb-2">
        <strong>Fecha de Reporte:</strong> {new Date(issue.date_reported).toLocaleDateString()}
      </p>

      <div className="mb-2 flex items-center justify-between">
        <div>
          <strong>ID de la Motocicleta:</strong>{" "}
          {issue.motorcycle_id !== undefined ? issue.motorcycle_id : "No asignado"}
        </div>
        {issue.motorcycle_id !== undefined && (
          <button
            onClick={() => navigate(`/view-motorcycles/${issue.motorcycle_id}`)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} className="mr-1" />
            Mostrar
          </button>
        )}
      </div>

      <p className="mb-4 flex items-center">
        <strong className="mr-2">Estado:</strong>
        {issue.status.toLowerCase() === "resuelto" ? (
          <span className="flex items-center text-green-600">
            <CheckCircle className="mr-1" size={20} /> Resuelto
          </span>
        ) : (
          <span className="flex items-center text-red-600">
            <XCircle className="mr-1" size={20} /> Pendiente
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

export default ViewIssue;
