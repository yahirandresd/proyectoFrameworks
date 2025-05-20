// src/components/products/ListProducts.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2 } from "lucide-react";
import { getProducts, deleteProduct } from "../../services/productService";
import { Product } from "../../models/Product";

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAction = async (action: string, item: Product) => {
    if (action === "edit") {
      navigate(`/products/edit/${item.id}`);
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar el producto "${item.name}"?`)) {
        try {
          if (item.id) {
            await deleteProduct(item.id);
            setProducts(products.filter(p => p.id !== item.id));
          }
        } catch (error) {
          console.error("Error eliminando producto:", error);
        }
      }
    }
  };

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Lista de Productos
        </h2>
        <button
          onClick={() => navigate("/products/create")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
           Crear Producto
        </button>
      </div>

      <TablaGenerica<Product>
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
