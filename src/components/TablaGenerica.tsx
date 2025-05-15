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

const TablaGenerica = <T,>({
  datos,
  columnas,
  formateadores = {},
  acciones,
  onAccion,
}: TablaGenericaProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={String(columna)} className="py-2 px-4 border-b">
                {String(columna)}
              </th>
            ))}
            {acciones.length > 0 && <th className="py-2 px-4 border-b">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columnas.map((columna) => {
                const value = item[columna];
                const formateador = formateadores[columna as keyof typeof formateadores];
                return (
                  <td key={String(columna)} className="py-2 px-4 border-b">
                    {formateador ? formateador(value) : String(value)}
                  </td>
                );
              })}
              {acciones.length > 0 && (
                <td className="py-2 px-4 border-b space-x-2">
                  {acciones.map((accion) => (
                    <button
                      key={accion.nombre}
                      onClick={() => onAccion(accion.nombre, item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {accion.icono}
                    </button>
                  ))}
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