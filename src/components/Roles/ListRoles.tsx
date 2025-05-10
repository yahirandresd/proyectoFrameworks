import React, { useState, useEffect } from 'react';
import TablaGenerica from '../TablaGenerica';

/*import { Eye, Edit, Trash2 } from 'lucide-react';
import { getRoles, deleteRole } from '../../services/roleService';
import Swal from 'sweetalert2';
import { Role } from '../../models/Role';

/*const ListRoles = () => {
  const [data, setData] = useState<Role[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const roles = await getRoles();
    setData(roles);
  };

  // Funciones para manejar las acciones
  const handleView = (id: number) => {
    console.log(`Ver registro con ID: ${id}`);
  };

  const handleEdit = (id: number) => {
    console.log(`Editar registro con ID: ${id}`);

    // Lógica para editar el registro
  };

  const handleDelete = async (id: number) => {
    console.log(`Intentando eliminar usuario con ID: ${id}`);
    Swal.fire({
      title: 'Eliminación',
      text: 'Está seguro de querer eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteRole(id);
        if (success) {
          Swal.fire({
            title: 'Eliminado',
            text: 'El registro se ha eliminado',
            icon: 'success',
          });
        }
        // 🔹 Vuelve a obtener los usuarios después de eliminar uno
        fetchData();
      }
    });
  };
};*/

interface Rol {
  id: number;
  nombre: string;
}

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Rol[]>([
    { id: 1, nombre: 'Admin' },
    { id: 2, nombre: 'Usuario' },
  ]);
  //console.log(API);

  const manejarAccion = (accion: string, item: Rol) => {
    if (accion === 'asignarPermisos') {
      console.log('Asignar permisos al rol:', item);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
        Lista de Roles
      </h2>
      <TablaGenerica
        datos={roles}
        columnas={['id', 'nombre']}
        acciones={[
          {
            nombre: 'asignarPermisos',
            etiqueta: 'Asignar Permisos',
          },
        ]}
        onAccion={manejarAccion}
      />
    </div>
  );
};

export default Roles;
