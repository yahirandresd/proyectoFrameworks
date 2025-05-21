import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Eye, Trash2 } from "lucide-react";
import { getCustomers, deleteCustomer } from "../../services/customerService";
import { Customer } from "../../models/Customer";
import Swal from "sweetalert2";

const ListCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error loading customers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const handleAction = async (action: string, item: Customer) => {
    if (action === "view") {
      navigate(`/view-customers/${item.id}`);
    } else if (action === "edit") {
      navigate(`/update-customers/${item.id}`);
    } else if (action === "delete") {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Eliminar al cliente ${item.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          await deleteCustomer(item.id);
          setCustomers(customers.filter((c) => c.id !== item.id));
          Swal.fire("¡Eliminado!", "El cliente ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error deleting customer:", error);
          Swal.fire("Error", "No se pudo eliminar el cliente.", "error");
        }
      }
    }
  };

  if (loading) return <div>Cargando clientes...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Lista de Clientes</h2>
        <button
          onClick={() => navigate("/create-customer")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
           Crear Cliente
        </button>
      </div>

      <TablaGenerica<Customer>
        datos={customers}
        columnas={["name", "email", "phone"]}
        acciones={[
          {
            nombre: "view",
            etiqueta: "Ver",
            icono: <Eye size={18} className="text-green-600" />,
          },
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

export default ListCustomers;
