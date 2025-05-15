// src/components/photos/ListPhotos.tsx
import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getPhotos, deletePhoto } from "../../services/photoService";
import { Photo } from "../../models/Photo";

const ListPhotos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Cargar fotos al iniciar
  useEffect(() => {
    const loadPhotos = async () => {
      const data = await getPhotos();
      setPhotos(data);
    };
    loadPhotos();
  }, []);

  const handleAction = async (action: string, item: Photo) => {
    if (action === "edit") {
      console.log("Editar foto:", item);
      // Aquí iría la lógica para abrir el formulario de edición
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar la foto con ID ${item.id}?`)) {
        await deletePhoto(item.id);
        setPhotos(photos.filter(p => p.id !== item.id));
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
        Lista de Fotos
      </h2>
      <TablaGenerica
        datos={photos}
        columnas={["id", "image_url", "caption", "taken_at"]}
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

export default ListPhotos;
