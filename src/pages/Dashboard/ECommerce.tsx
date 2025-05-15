const ECommerce = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const isAuthenticated = user && user.token;

  return (
    <div className="p-4 bg-white rounded shadow">
      {!isAuthenticated ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">¡Bienvenido!</h2>
          <p className="mb-4">Inicia sesión para ver contenido personalizado.</p>
          <button
            onClick={() => window.location.href = '/auth/signin'}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Iniciar sesión
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Hola {user.name}</h2>
          <p>Estos son tus últimos restaurantes visitados:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Restaurante El Corral</li>
            <li>Crepes & Waffles</li>
            <li>Andrés Carne de Res</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ECommerce;
