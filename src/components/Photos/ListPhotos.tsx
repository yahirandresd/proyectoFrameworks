// src/components/photos/ListPhotos.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getPhotos, deletePhoto } from "../../services/photoService";
import { Photo } from "../../models/Photo";

const ListPhotos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await getPhotos();
        setPhotos(data);
      } catch (error) {
        console.error("Error cargando fotos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, []);

  const handleAction = async (action: string, item: Photo) => {
    if (action === "edit") {
      navigate(`/photos/edit/${item.id}`);
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar la foto con ID ${item.id}?`)) {
        try {
          await deletePhoto(item.id);
          setPhotos(photos.filter(p => p.id !== item.id));
        } catch (error) {
          console.error("Error eliminando foto:", error);
        }
      }
    }
  };

  if (loading) return <div>Cargando fotos...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Lista de Fotos
        </h2>
        <button
          onClick={() => navigate("/create-photo")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
           Crear Foto
        </button>
      </div>

      <TablaGenerica<Photo>
        datos={photos}
        columnas={["id", "image_url", "caption", "taken_at", "issue_id"]}
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
