import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/productService";
import { Product } from "../../models/Product";
import Swal from "sweetalert2";
const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const product = await getProductById(Number(id));
      if (!product) {
        navigate("/", { replace: true });
        setTimeout(() => {
          Swal.fire({ title: "producto no encontrada", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
        }, 0);
        return;
      }

      reset(product);
    };

    fetchProduct();
  }, [id, navigate, reset]);

  const onSubmit = async (data: Product) => {
    if (!id) return;
    try {
      const updated = await updateProduct(Number(id), data);
      if (updated) {
        Swal.fire({ title: "producto actualizado con éxito", icon: "success", confirmButtonText: "Aceptar", confirmButtonColor: "#28a745" });
        navigate("/list-products");
      } else {
        Swal.fire({ title: "Error actualizando producto", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
      }
    } catch (error) {
      console.error("Error actualizando producto:", error);
      Swal.fire({ title: "Error actualizando producto", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input {...register("name")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea {...register("description")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio</label>
          <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <input {...register("category")} className="mt-1 block w-full border rounded p-2" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
