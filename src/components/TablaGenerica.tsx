import React from "react";

type Accion = {
  nombre: string;
  etiqueta: string;
  icono?: JSX.Element;
};

type TablaGenericaProps<T> = {
  datos: T[];
  columnas: string[];
  acciones: Accion[];
  onAccion: (accion: string, item: T) => void;
};

const TablaGenerica = <T,>({ datos, columnas, acciones, onAccion }: TablaGenericaProps<T>) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Listado</h3>
      </div>
      <div className="overflow-x-auto p-6.5">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columnas.map((col) => (
                <th key={col} className="px-6 py-3">{col}</th>
              ))}
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700"
              >
                {columnas.map((col) => (
                  <td key={col} className="px-6 py-4 text-gray-900 dark:text-white">
                    {item[col as keyof T] as string | number | JSX.Element}
                  </td>
                ))}
                <td className="px-6 py-4 space-x-2">
                  {acciones.map((accion) => (
                    <button
                      key={accion.nombre}
                      onClick={() => onAccion(accion.nombre, item)}
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {accion.icono || accion.etiqueta}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaGenerica;
