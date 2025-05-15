// src/components/products/ListProducts.tsx
import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getProducts, deleteProduct } from "../../services/productService";
import { Product } from "../../models/Product";

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleAction = async (action: string, item: Product) => {
    if (action === "edit") {
      console.log("Editar producto:", item);
      // Aquí iría la lógica para abrir el formulario de edición
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar el producto "${item.name}"?`)) {
        await deleteProduct(item.id);
        setProducts(products.filter(p => p.id !== item.id));
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
        Lista de Productos
      </h2>
      <TablaGenerica
        datos={products}
        columnas={["id", "name", "description", "price", "category"]}
        acciones={[
          {
            nombre: "edit",
            etiqueta: "Editar",
            icono: <Edit size={18} className="text-blue-600" />,
          },
          {
            nombre: "delete",
            etiqueta: "Eliminar",
            icono: <Trash2 size={18} className="text-red-600" />,
          },
        ]}
        onAccion={handleAction}
      />
    </div>
  );
};

export default ListProducts;
