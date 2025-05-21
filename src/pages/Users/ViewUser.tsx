import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../services/userService";
import { User } from "../../models/User";
import { CheckCircle, XCircle } from "lucide-react";

const ViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getUserById(Number(id)).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Cargando usuario...
      </div>
    );

  if (!user)
    return (
      <div className="text-center text-red-500">
        No se encontró el usuario.
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Volver
        </button>
      </div>
    );

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle del Usuario</h2>
      <p className="mb-2">
        <strong>ID:</strong> {user.id}
      </p>
      <p className="mb-2">
        <strong>Nombre:</strong> {user.name}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="mb-2">
        <strong>Edad:</strong> {user.age}
      </p>
      <p className="mb-2">
        <strong>Ciudad:</strong> {user.city}
      </p>
      <p className="mb-2">
        <strong>Teléfono:</strong> {user.phone}
      </p>
      <p className="mb-4 flex items-center">
        <strong className="mr-2">Activo:</strong>
        {user.is_active ? (
          <span className="flex items-center text-green-600">
            <CheckCircle className="mr-1" size={20} /> Activo
          </span>
        ) : (
          <span className="flex items-center text-red-600">
            <XCircle className="mr-1" size={20} /> Inactivo
          </span>
        )}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Volver
      </button>
    </div>
  );
};

export default ViewUser;
