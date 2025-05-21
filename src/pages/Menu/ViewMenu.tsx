// src/pages/Menu/ViewMenu.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuById } from "../../services/menuService";
import { Menu } from "../../models/Menu";
import { CheckCircle, XCircle } from "lucide-react";

const ViewMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getMenuById(Number(id)).then((data) => {
      setMenu(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Cargando menú...
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="text-center text-red-500">
        No se encontró el menú.
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle del Menú</h2>
      <p className="mb-2">
        <strong>ID:</strong> {menu.id}
      </p>
      <p className="mb-2">
        <strong>Precio:</strong> ${menu.price.toFixed(2)}
      </p>
      <p className="mb-4 flex items-center">
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
      </p>
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
