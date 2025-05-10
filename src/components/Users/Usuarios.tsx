import React, { useState } from 'react';
import TablaGenerica from '../../components/TablaGenerica';
import { Edit, Trash2 } from 'lucide-react';

type Usuario = {
  id: number;
  nombre: string;
  email: string;
};

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nombre: 'Juan', email: 'juan@example.com' },
    { id: 2, nombre: 'María', email: 'maria@example.com' },
  ]);

  const manejarAccion = (accion: string, item: Usuario) => {
    if (accion === 'editar') {
      console.log('Editar usuario:', item);
    } else if (accion === 'eliminar') {
      console.log('Eliminar usuario:', item);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
        Lista de Usuarios
      </h2>
      <TablaGenerica
        datos={usuarios}
        columnas={['id', 'nombre', 'email']}
        acciones={[
          {
            nombre: 'editar',
            etiqueta: 'Editar',
            icono: <Edit size={18} className="text-yellow-600" />,
          },
          {
            nombre: 'eliminar',
            etiqueta: 'Eliminar',
            icono: <Trash2 size={18} className="text-red-600" />,
          },
        ]}
        onAccion={manejarAccion}
      />
    </div>
  );
};

export default Usuarios;
