import React from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "../../services/productService"; // Ajusta la ruta si es necesario
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
interface ProductFormValues {
    name: string;
    description: string;
    price: number; // Se recomienda usar "number" para valores decimales
    category: string;
}

const CreateProduct: React.FC = () => {
    const navigate= useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormValues>();

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const result = await createProduct(data); // Hace POST al backend
      if (result) {
        Swal.fire({ title: "producto creado con éxito", icon: "success", confirmButtonText: "Aceptar", confirmButtonColor: "#28a745" });
        navigate("/list-products");
      } else {
        Swal.fire({ title: "Error al crear el producto", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
      }
    } catch (error) {
      Swal.fire({ title: "Error inesperado", icon: "error", confirmButtonText: "Aceptar", confirmButtonColor: "#dc3545" });
      console.error(error);
    }
  };

    return (
        <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
            <h1 className="text-2xl font-bold mb-6">Crear Producto</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="name"{...register("name", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.name && <p className="text-red-600">El nombre es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripcion</label>
                    <input type="string"{...register("description", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.description && <p className="text-red-600">La descripcion es obligatoria</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                    <input type="number"{...register("price", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.price && <p className="text-red-600">El precio es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Categoria</label>
                    <input type="string" {...register("category", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.category && <p className="text-red-600">La categoria es obligatoria</p>}
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
                    Guardar Producto
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
