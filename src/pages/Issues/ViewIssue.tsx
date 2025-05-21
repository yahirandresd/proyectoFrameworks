import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIssueById } from "../../services/issueService";
import { Issue } from "../../models/Issue";
import { CheckCircle, XCircle } from "lucide-react";

const ViewIssue: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getIssueById(Number(id)).then(data => {
      setIssue(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Cargando incidencia...
      </div>
    );

  if (!issue)
    return (
      <div className="text-center text-red-500">
        No se encontró la incidencia.
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
        <strong>Fecha de Reporte:</strong>{" "}
        {new Date(issue.date_reported).toLocaleDateString()}
      </p>
      <p className="mb-2">
        <strong>ID de la Motocicleta:</strong> {issue.motorcycle_id}
      </p>
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
