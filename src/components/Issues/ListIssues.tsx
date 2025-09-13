// src/components/issues/ListIssues.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Eye, Trash2 } from "lucide-react";
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
        console.error("Error al cargar Ausuntos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadIssues();
  }, []);

  const handleAction = async (action: string, item: Issue) => {
    if (action === "view") {
      navigate(`/view-issues/${item.id}`);
    } else if (action === "edit") {
      navigate(`/update-issues/${item.id}`);
    } else if (action === "delete") {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Eliminar la Ausunto reportada el ${new Date(item.date_reported).toLocaleDateString()}?`,
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
          Swal.fire("¡Eliminado!", "La Ausunto ha sido eliminada.", "success");
        } catch (error) {
          console.error("Error al eliminar la Ausunto:", error);
          Swal.fire("Error", "No se pudo eliminar la Ausunto.", "error");
        }
      }
    }
  };

  if (loading) return <div>Cargando asuntos...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Lista de Asuntos</h2>
        <button
          onClick={() => navigate("/create-issues")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
           Crear Ausunto
        </button>
      </div>

      <TablaGenerica<Issue>
        datos={issues}
        columnas={["description", "issue_type", "date_reported", "status", "motorcycle_id"]}
        formateadores={{
          date_reported: (value: Date) => new Date(value).toLocaleDateString(),
        }}
        acciones={[
          {
            nombre: "view",
            etiqueta: "Ver",
            icono: <Eye size={18} className="text-green-600" />,  
          },
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
