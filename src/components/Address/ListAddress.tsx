import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2, Eye } from "lucide-react";
import { getAddresses, deleteAddress } from "../../services/addressService";
import { Address } from "../../models/Address";
import Swal from "sweetalert2";

const ListAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data);
      } catch (error) {
        console.error("Error loading addresses:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAddresses();
  }, []);

  const handleAction = async (action: string, item: Address) => {
    if (action === "view") {
      navigate(`/addresses/view/${item.id}`);
    } else if (action === "edit") {
      navigate(`/update-address/${item.id}`);
    } else if (action === "delete") {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Eliminar dirección en ${item.street}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          await deleteAddress(item.id);
          setAddresses(addresses.filter((a) => a.id !== item.id));
          Swal.fire("¡Eliminado!", "La dirección ha sido eliminada.", "success");
        } catch (error) {
          console.error("Error deleting address:", error);
          Swal.fire("Error", "No se pudo eliminar la dirección.", "error");
        }
      }
    }
  };

  if (loading) return <div>Cargando direcciones...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Lista de Direcciones</h2>
        <button
          onClick={() => navigate("/create-address")}
          className="flex items-center bg-amarilloCanario hover:bg-yellow-500 text-white px-4 py-2 rounded shadow-sm transition duration-150 dark:bg-amarilloCanario dark:hover:bg-yellow-600"
        >
          Crear Dirección
        </button>
      </div>

      <TablaGenerica<Address>
        datos={addresses}
        columnas={["street", "city", "state", "postal_code"]}
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

export default ListAddresses;
