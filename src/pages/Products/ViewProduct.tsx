// src/pages/Product/ViewProduct.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { Product } from "../../models/Product";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Mostrar alerta de carga
    Swal.fire({
      title: "Cargando producto...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    getProductById(Number(id))
      .then((data) => {
        if (!data) {
          Swal.fire({
            icon: "error",
            title: "No encontrado",
            text: "No se encontró el producto.",
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
          setProduct(data);
          Swal.close(); // Cerrar SweetAlert si el producto fue encontrado
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar el producto.",
          confirmButtonText: "Volver",
          confirmButtonColor: "#d33",
        }).then(() => navigate(-1));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return null; // El loading lo maneja Swal

  if (!product) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle del Producto</h2>

      <div className="mb-2">
        <strong>ID:</strong> {product.id}
      </div>

      <div className="mb-2">
        <strong>Nombre:</strong> {product.name}
      </div>

      <div className="mb-2">
        <strong>Descripción:</strong> {product.description}
      </div>

      <div className="mb-2">
        <strong>Precio:</strong> ${product.price.toFixed(2)}
      </div>

      <div className="mb-4">
        <strong>Categoría:</strong> {product.category}
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

export default ViewProduct;
