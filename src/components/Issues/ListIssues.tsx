import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getIssues, deleteIssue } from "../../services/issueService";
import { Issue } from "../../models/Issue";

const ListIssues: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const data = await getIssues();
        setIssues(data);
      } catch (error) {
        console.error("Error loading issues:", error);
      } finally {
        setLoading(false);
      }
    };
    loadIssues();
  }, []);

  const handleAction = async (action: string, item: Issue) => {
    if (action === "edit") {
      console.log("Edit issue:", item);
    } else if (action === "delete") {
      if (window.confirm(`Delete issue reported on ${item.date_reported.toLocaleDateString()}?`)) {
        try {
          await deleteIssue(item.id);
          setIssues(issues.filter(i => i.id !== item.id));
        } catch (error) {
          console.error("Error deleting issue:", error);
        }
      }
    }
  };

  if (loading) return <div>Loading issues...</div>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Issue List</h2>
      <TablaGenerica<Issue>
        datos={issues}
        columnas={["description", "issue_type", "date_reported", "status"]}
        formateadores={{
          date_reported: (value: Date) => value.toLocaleDateString()
        }}
        acciones={[
          {
            nombre: "edit",
            etiqueta: "Edit",
            icono: <Edit size={18} className="text-blue-600" />,
          },
          {
            nombre: "delete",
            etiqueta: "Delete",
            icono: <Trash2 size={18} className="text-red-600" />,
          },
        ]}
        onAccion={handleAction}
      />
    </div>
  );
};

export default ListIssues;