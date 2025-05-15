import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { getMenus, deleteMenu } from "../../services/menuService";
import { Menu } from "../../models/Menu";

const ListMenus: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const data = await getMenus();
        setMenus(data);
      } catch (error) {
        console.error("Error loading menus:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMenus();
  }, []);

  const handleAction = async (
    action: string,
    item: { id: number; price: string; availability: JSX.Element }
  ) => {
    const originalMenu = menus.find(m => m.id === item.id);
    if (!originalMenu) return;

    if (action === "edit") {
      console.log("Edit menu:", originalMenu);
      // Lógica para editar
    } else if (action === "delete") {
      if (window.confirm(`Delete menu with price $${item.price}?`)) {
        try {
          await deleteMenu(originalMenu.id);
          setMenus(menus.filter(m => m.id !== originalMenu.id));
        } catch (error) {
          console.error("Error deleting menu:", error);
        }
      }
    }
  };

  if (loading) return <div>Loading menus...</div>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Menu List</h2>
      <TablaGenerica<
        { id: number; price: string; availability: JSX.Element }
      >
        datos={menus.map(menu => ({
          id: menu.id,
          price: `$${menu.price.toFixed(2)}`,
          availability: menu.availability ? (
            <span className="text-green-500 flex items-center">
              <CheckCircle className="mr-1" size={16} /> Available
            </span>
          ) : (
            <span className="text-red-500 flex items-center">
              <XCircle className="mr-1" size={16} /> Unavailable
            </span>
          )
        }))}
        columnas={["price", "availability"]}
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

export default ListMenus;