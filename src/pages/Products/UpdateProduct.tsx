import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/productService";
import { Product } from "../../models/Product";

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
          alert("Producto no encontrado");
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
        alert("Producto actualizado con éxito");
        navigate("/products");
      } else {
        alert("Error actualizando producto");
      }
    } catch (error) {
      console.error("Error actualizando producto:", error);
      alert("Error actualizando producto");
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
