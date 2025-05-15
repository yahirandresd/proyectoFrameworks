import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { getUsers, deleteUser } from "../../services/userService";
import { User } from "../../models/User";

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleAction = async (action: string, item: User) => {
    if (action === "edit") {
      console.log("Edit user:", item);
    } else if (action === "delete") {
      if (window.confirm(`Delete user ${item.name}?`)) {
        try {
          if (item.id) {
            await deleteUser(item.id);
            setUsers(users.filter(u => u.id !== item.id));
          }
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      }
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">User List</h2>
      <TablaGenerica<User>
        datos={users.map(user => ({
          ...user,
          is_active_display: user.is_active ? (
            <span className="text-green-500 flex items-center">
              <UserCheck className="mr-1" size={16} /> Active
            </span>
          ) : (
            <span className="text-red-500 flex items-center">
              <UserX className="mr-1" size={16} /> Inactive
            </span>
          )
        }))}
        columnas={["name", "email", "age", "city", "phone", "is_active"]}
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

export default ListUsers;