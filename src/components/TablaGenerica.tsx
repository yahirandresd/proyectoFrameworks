// TablaGenerica.tsx
import React from "react";

interface TablaGenericaProps<T> {
  datos: T[];
  columnas: (keyof T)[];
  formateadores?: {
    [K in keyof T]?: (value: T[K]) => React.ReactNode;
  };
  acciones: {
    nombre: string;
    etiqueta: string;
    icono: React.ReactNode;
  }[];
  onAccion: (accion: string, item: T) => void;
}

// Función auxiliar para capitalizar columnas
const capitalizar = (texto: string) =>
  texto.charAt(0).toUpperCase() + texto.slice(1).replace(/_/g, " ");

const TablaGenerica = <T,>({
  datos,
  columnas,
  formateadores = {},
  acciones,
  onAccion,
}: TablaGenericaProps<T>) => {
  return (
    <div className="overflow-x-auto w-full rounded-lg shadow border">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
          <tr>
            {columnas.map((columna) => (
              <th key={String(columna)} className="px-6 py-3 whitespace-nowrap">
                {capitalizar(String(columna))}
              </th>
            ))}
            {acciones.length > 0 && (
              <th className="px-6 py-3 whitespace-nowrap">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {datos.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columnas.map((columna) => {
                const value = item[columna];
                const formateador = formateadores[columna as keyof typeof formateadores];
                return (
                  <td key={String(columna)} className="px-6 py-4 whitespace-nowrap">
                    {formateador ? formateador(value) : String(value)}
                  </td>
                );
              })}
              {acciones.length > 0 && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {acciones.map((accion) => (
                      <button
                        key={accion.nombre}
                        onClick={() => onAccion(accion.nombre, item)}
                        className="text-blue-600 hover:text-blue-800"
                        title={accion.etiqueta}
                      >
                        {accion.icono}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaGenerica;
