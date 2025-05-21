// src/pages/Address/ViewAddress.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAddressById } from "../../services/addressService";
import { Address } from "../../models/Address";
import { Eye } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const ViewAddress: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Swal.fire({
      title: "Cargando dirección...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    getAddressById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró la dirección.",
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
          setAddress(data);
          Swal.close();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar la dirección.",
          confirmButtonText: "Volver",
          confirmButtonColor: "#d33",
        }).then(() => navigate(-1));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return null; // Carga manejada por Swal
  if (!address) return null; // No encontrado manejado por Swal

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle de la Dirección</h2>
      <p className="mb-2">
        <strong>ID:</strong> {address.id}
      </p>
      <p className="mb-2">
        <strong>Calle:</strong> {address.street}
      </p>
      <p className="mb-2">
        <strong>Ciudad:</strong> {address.city}
      </p>
      <p className="mb-2">
        <strong>Estado:</strong> {address.state}
      </p>
      <p className="mb-2">
        <strong>Código Postal:</strong> {address.postal_code}
      </p>
      <p className="mb-2">
        <strong>Información Adicional:</strong> {address.additional_info}
      </p>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <strong>ID de la Orden:</strong>{" "}
          {address.order_id !== undefined ? address.order_id : "No asignado"}
        </div>
        {address.order_id !== undefined && (
          <button
            onClick={() => navigate(`/view-orders/${address.order_id}`)}
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

export default ViewAddress;
