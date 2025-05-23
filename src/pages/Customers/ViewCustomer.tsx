// src/pages/Customer/ViewCustomer.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById } from "../../services/customerService";
import { Customer } from "../../models/Customer";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const ViewCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Swal.fire({
      title: "Cargando cliente...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    getCustomerById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró el cliente.",
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
          setCustomer(data);
          Swal.close();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar el cliente.",
          confirmButtonText: "Volver",
          confirmButtonColor: "#d33",
        }).then(() => navigate(-1));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return null; // Carga manejada por Swal
  if (!customer) return null; // No encontrado manejado por Swal

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle del Cliente</h2>
      <p className="mb-2">
        <strong>ID:</strong> {customer.id}
      </p>
      <p className="mb-2">
        <strong>Nombre:</strong> {customer.name}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {customer.email}
      </p>
      <p className="mb-4">
        <strong>Teléfono:</strong> {customer.phone}
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

export default ViewCustomer;
