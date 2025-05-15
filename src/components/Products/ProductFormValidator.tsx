// src/components/products/ProductFormValidator.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Product } from "../../models/Product";

// Esquema de validación
const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio").max(100),
  description: yup.string().required("La descripción es obligatoria").max(300),
  price: yup
    .number()
    .typeError("El precio debe ser un número")
    .required("El precio es obligatorio")
    .positive("El precio debe ser positivo"),
  category: yup.string().required("La categoría es obligatoria").max(100),
});

interface Props {
  initialData?: Product;
  onSubmit: (data: Omit<Product, "id">) => void;
}

const ProductFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Product, "id">>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      category: "",
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          {...register("description")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Precio</label>
        <input
          type="number"
          step="0.01"
          {...register("price")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <input
          {...register("category")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        {initialData ? "Actualizar" : "Crear"} Producto
      </button>
    </form>
  );
};

export default ProductFormValidator;
