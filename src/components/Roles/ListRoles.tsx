import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getRoles, deleteRole } from "../../services/roleService";
import { Role } from "../../models/Role";

const ListRoles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error cargando roles:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRoles();
  }, []);

  const handleAction = async (action: string, item: Role) => {
    if (action === "edit") {
      navigate(`/roles/edit/${item.id}`);
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar el rol "${item.nombre}"?`)) {
        try {
          if (item.id) {
            await deleteRole(item.id);
            setRoles(roles.filter(r => r.id !== item.id));
          }
        } catch (error) {
          console.error("Error eliminando rol:", error);
        }
      }
    }
  };

  if (loading) return <div>Cargando roles...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Lista de Roles</h2>
        <button
          onClick={() => navigate("/create-role")}
          className="bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
          Crear Rol
        </button>
      </div>

      <TablaGenerica<Role>
        datos={roles}
        columnas={["nombre"]}
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

export default ListRoles;
