import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2, Plus } from "lucide-react";
import { getRestaurants, deleteRestaurant } from "../../services/restaurantService";
import { Restaurant } from "../../models/Restaurant";
import { useNavigate } from "react-router-dom";

const ListRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
    };
    loadRestaurants();
  }, []);

  const handleAction = async (action: string, item: Restaurant) => {
    if (action === "edit") {
      navigate(`/update-restaurant/${item.id}`);
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar el restaurante "${item.name}"?`)) {
        await deleteRestaurant(item.id);
        setRestaurants(restaurants.filter(r => r.id !== item.id));
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Lista de Restaurantes
        </h2>
        <button
          onClick={() => navigate("/create-restaurant")}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Plus className="mr-2" size={18} /> Crear Restaurante
        </button>
      </div>
      <TablaGenerica
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