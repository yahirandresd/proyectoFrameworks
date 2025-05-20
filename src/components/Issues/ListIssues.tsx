// src/components/issues/ListIssues.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getIssues, deleteIssue } from "../../services/issueService";
import { Issue } from "../../models/Issue";
import Swal from "sweetalert2";

const ListIssues: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const data = await getIssues();
        setIssues(data);
      } catch (error) {
        console.error("Error al cargar incidencias:", error);
      } finally {
        setLoading(false);
      }
    };
    loadIssues();
  }, []);

  const handleAction = async (action: string, item: Issue) => {
    if (action === "edit") {
      navigate(`/issues/edit/${item.id}`);
    } else if (action === "delete") {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Eliminar la incidencia reportada el ${new Date(item.date_reported).toLocaleDateString()}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          await deleteIssue(item.id);
          setIssues(issues.filter((i) => i.id !== item.id));
          Swal.fire("¡Eliminado!", "La incidencia ha sido eliminada.", "success");
        } catch (error) {
          console.error("Error al eliminar la incidencia:", error);
          Swal.fire("Error", "No se pudo eliminar la incidencia.", "error");
        }
      }
    }
  };

  if (loading) return <div>Cargando incidencias...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Lista de Incidencias</h2>
        <button
          onClick={() => navigate("/issues/create")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
           Crear Incidencia
        </button>
      </div>

      <TablaGenerica<Issue>
        datos={issues}
        columnas={["description", "issue_type", "date_reported", "status"]}
        formateadores={{
          date_reported: (value: Date) => new Date(value).toLocaleDateString(),
        }}
        acciones={[
          {
            nombre: "edit",
            etiqueta: "Editar",
            icono: <Edit size={18} className="text-blue-600" />,
          },
          {
            nombre: "delete",
            etiqueta: "Eliminar",
            icono: <Trash2 size={18} className="text-red-600" />,
          },
        ]}
        onAccion={handleAction}
      />
    </div>
  );
};

export default ListIssues;
