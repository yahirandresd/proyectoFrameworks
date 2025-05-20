// src/components/menus/ListMenus.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { getMenus, deleteMenu } from "../../services/menuService";
import { Menu } from "../../models/Menu";
import Swal from "sweetalert2";

const ListMenus: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const data = await getMenus();
        setMenus(data);
      } catch (error) {
        console.error("Error al cargar menús:", error);
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
    const originalMenu = menus.find((m) => m.id === item.id);
    if (!originalMenu) return;

    if (action === "edit") {
      navigate(`/update-menu/${originalMenu.id}`);
    } else if (action === "delete") {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Eliminar el menú con precio ${item.price}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          await deleteMenu(originalMenu.id);
          setMenus(menus.filter((m) => m.id !== originalMenu.id));
          Swal.fire("¡Eliminado!", "El menú ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error eliminando el menú:", error);
          Swal.fire("Error", "No se pudo eliminar el menú.", "error");
        }
      }
    }
  };

  if (loading) return <div>Cargando menús...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Lista de Menús
        </h2>
        <button
          onClick={() => navigate("/create-menu")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
           Crear Menú
        </button>
      </div>

      <TablaGenerica<
        { id: number; price: string; availability: JSX.Element }
      >
        datos={menus.map((menu) => ({
          id: menu.id,
          price: `$${menu.price.toFixed(2)}`,
          availability: menu.availability ? (
            <span className="text-green-500 flex items-center">
              <CheckCircle className="mr-1" size={16} /> Disponible
            </span>
          ) : (
            <span className="text-red-500 flex items-center">
              <XCircle className="mr-1" size={16} /> No disponible
            </span>
          ),
        }))}
        columnas={["price", "availability"]}
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

export default ListMenus;
