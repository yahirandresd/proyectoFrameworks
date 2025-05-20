import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getRestaurants, deleteRestaurant } from "../../services/restaurantService";
import { Restaurant } from "../../models/Restaurant";

const ListRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Error cargando restaurantes:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);

  const handleAction = async (action: string, item: Restaurant) => {
    if (action === "edit") {
      navigate(`/update-restaurant/${item.id}`);
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar el restaurante "${item.name}"?`)) {
        try {
          if (item.id) {
            await deleteRestaurant(item.id);
            setRestaurants(restaurants.filter(r => r.id !== item.id));
          }
        } catch (error) {
          console.error("Error eliminando restaurante:", error);
        }
      }
    }
  };

  if (loading) return <div>Cargando restaurantes...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Lista de Restaurantes
        </h2>
        <button
          onClick={() => navigate("/create-restaurant")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
           Crear Restaurante
        </button>
      </div>

      <TablaGenerica<Restaurant>
        datos={restaurants}
        columnas={["id", "name", "address", "phone", "email"]}
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

export default ListRestaurants;
