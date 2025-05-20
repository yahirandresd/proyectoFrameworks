import React, { useState, useEffect } from "react";
import TablaGenerica from "../TablaGenerica";
import { Edit, Trash2, Eye } from "lucide-react";
import { getAddresses, deleteAddress } from "../../services/addressService";
import { Address } from "../../models/Address";

const ListAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const loadAddresses = async () => {
      const data = await getAddresses();
      setAddresses(data);
    };
    loadAddresses();
  }, []);

  const handleAction = async (action: string, item: Address) => {
    if (action === "edit") {
      console.log("Editar dirección:", item);
    } else if (action === "delete") {
      if (window.confirm(`¿Eliminar dirección de ${item.street}?`)) {
        await deleteAddress(item.id);
        setAddresses(addresses.filter(a => a.id !== item.id));
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Lista de Direcciones
      </h2>
      <TablaGenerica
        datos={addresses}
        columnas={["street", "city", "state", "postal_code"]}
        acciones={[
          {
            nombre: "view",
            etiqueta: "ver",
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