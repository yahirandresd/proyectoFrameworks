import { useState, FormEvent } from 'react';
import axios from 'axios';

interface MenuResult {
  menu_id: number;
  restaurant_name: string;
  product_name: string;
  // Si quieres incluir más campos, agrégalos aquí
  // price: number;
  // availability: boolean;
}

function MenuSearch() {
  const [name, setName] = useState<string>('');
  const [results, setResults] = useState<MenuResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get<MenuResult[]>(`http://localhost:5000/menus/search?name=${encodeURIComponent(name)}`);
      setResults(res.data);
    } catch (err) {
      console.error('Error al buscar productos:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Buscar Productos en el Menú</h2>
      
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del producto"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      {loading ? (
        <p>Cargando resultados...</p>
      ) : results.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID Menú</th>
              <th className="border px-4 py-2">Restaurante</th>
              <th className="border px-4 py-2">Producto</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.menu_id}>
                <td className="border px-4 py-2 text-center">{item.menu_id}</td>
                <td className="border px-4 py-2">{item.restaurant_name}</td>
                <td className="border px-4 py-2">{item.product_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MenuSearch;
