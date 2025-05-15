import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getRestaurants, deleteRestaurant } from "../../services/restaurantService";
import { Restaurant } from "../../models/Restaurant";

const ListRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // Cargar restaurantes al iniciar
  useEffect(() => {
    const loadRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
    };
    loadRestaurants();
  }, []);

  const handleAction = async (action: string, item: Restaurant) => {
    if (action === "edit") {
      console.log("Editar restaurante:", item);
      // Aquí iría la lógica para abrir el formulario de edición
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar el restaurante "${item.name}"?`)) {
        await deleteRestaurant(item.id);
        setRestaurants(restaurants.filter(r => r.id !== item.id));
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
        Lista de Restaurantes
      </h2>
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