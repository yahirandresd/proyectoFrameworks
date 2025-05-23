// src/pages/Menu/ViewMenu.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuById } from "../../services/menuService";
import { Menu } from "../../models/Menu";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { CheckCircle, XCircle, Eye } from "lucide-react";

const ViewMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Swal.fire({
      title: "Cargando menú...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    getMenuById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró el menú.",
            confirmButtonText: "Volver",
            confirmButtonColor: "#3085d6",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(-1);
            }
          });
        } else {
          setMenu(data);
          Swal.close();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar el menú.",
          confirmButtonText: "Volver",
          confirmButtonColor: "#d33",
        }).then(() => navigate(-1));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return null; // carga mostrada con Swal

  if (!menu) return null; // no encontrado mostrado con Swal

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle del Menú</h2>

      <div className="mb-2">
        <strong>ID:</strong> {menu.id}
      </div>

      <div className="mb-2">
        <strong>Precio:</strong> ${menu.price.toFixed(2)}
      </div>

      <div className="mb-2 flex items-center">
        <strong className="mr-2">Disponibilidad:</strong>
        {menu.availability ? (
          <span className="flex items-center text-green-600">
            <CheckCircle className="mr-1" size={20} /> Disponible
          </span>
        ) : (
          <span className="flex items-center text-red-600">
            <XCircle className="mr-1" size={20} /> No disponible
          </span>
        )}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div>
          <strong>ID del Restaurante:</strong>{" "}
          {menu.restaurant_id !== undefined ? menu.restaurant_id : "No asignado"}
        </div>
        {menu.restaurant_id !== undefined && (
          <button
            onClick={() => navigate(`/view-restaurant/${menu.restaurant_id}`)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} className="mr-1" />
            Mostrar
          </button>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <strong>ID del Producto:</strong>{" "}
          {menu.product_id !== undefined ? menu.product_id : "No asignado"}
        </div>
        {menu.product_id !== undefined && (
          <button
            onClick={() => navigate(`/view-product/${menu.product_id}`)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} className="mr-1" />
            Mostrar
          </button>
        )}
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

export default ViewMenu;
