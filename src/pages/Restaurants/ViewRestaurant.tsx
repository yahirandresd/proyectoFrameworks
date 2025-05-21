// src/pages/Restaurant/ViewRestaurant.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantById } from "../../services/restaurantService";
import { Restaurant } from "../../models/Restaurant";
import Swal from "sweetalert2";

const ViewRestaurant: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getRestaurantById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró el restaurante.",
            confirmButtonText: "Volver",
            confirmButtonColor: "#3085d6", // color de fondo
            customClass: {
                confirmButton: 'swal2-custom-confirm', // tu clase personalizada
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            }).then((result) => {
            if (result.isConfirmed) {
                navigate(-1);
            }
            });

        } else {
          setRestaurant(data);
          setLoading(false);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar el restaurante.",
          confirmButtonText: "Cerrar",
          confirmButtonColor: "#3085d6",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          navigate(-1);
        });
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Cargando restaurante...
      </div>
    );
  }

  if (!restaurant) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle del Restaurante</h2>

      <div className="mb-2">
        <strong>ID:</strong> {restaurant.id}
      </div>

      <div className="mb-2">
        <strong>Nombre:</strong> {restaurant.name}
      </div>

      <div className="mb-2">
        <strong>Dirección:</strong> {restaurant.address}
      </div>

      <div className="mb-2">
        <strong>Teléfono:</strong> {restaurant.phone}
      </div>

      <div className="mb-4">
        <strong>Email:</strong> {restaurant.email}
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

export default ViewRestaurant;
