// src/pages/Photo/ViewPhoto.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPhotoById } from "../../services/photoService";
import { Photo } from "../../models/Photo";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { Eye } from "lucide-react";

const ViewPhoto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Swal.fire({
      title: "Cargando foto...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    getPhotoById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró la foto.",
            confirmButtonText: "Volver",
            confirmButtonColor: "#3085d6",
            customClass: {
              confirmButton: "swal2-custom-confirm",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(-1);
            }
          });
        } else {
          setPhoto(data);
          Swal.close();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar la foto.",
          confirmButtonText: "Volver",
          confirmButtonColor: "#d33",
        }).then(() => navigate(-1));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return null; // loading se muestra con Swal

  if (!photo) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle de la Foto</h2>

      <div className="mb-4 text-center">
        <img
          src={photo.image_url}
          alt={photo.caption}
          className="max-w-full h-auto rounded border"
        />
      </div>

      <div className="mb-2">
        <strong>ID:</strong> {photo.id}
      </div>

      <div className="mb-2">
        <strong>Descripción:</strong> {photo.caption}
      </div>

      <div className="mb-2">
        <strong>Fecha de Captura:</strong> {new Date(photo.taken_at).toLocaleString()}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <strong>ID de la Incidencia:</strong> {photo.issue_id}
        </div>
        <button
          onClick={() => navigate(`/view-issues/${photo.issue_id}`)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <Eye size={18} className="mr-1" />
          Mostrar
        </button>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Volver
      </button>
    </div>
  );
};

export default ViewPhoto;
