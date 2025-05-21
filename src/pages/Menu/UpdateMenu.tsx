import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuById, updateMenu } from "../../services/menuService";
import { Menu } from "../../models/Menu";
import Swal from "sweetalert2";
const EditMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Menu>();

  useEffect(() => {
    const fetchMenu = async () => {
      if (!id) return;

      const menu = await getMenuById(Number(id));
      if (!menu) {
        navigate("/", { replace: true });
        setTimeout(() => {
          Swal.fire({title:"menu no encontrado",icon: "error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
        }, 0);
        return;
      }

      reset(menu);
    };

    fetchMenu();
  }, [id, navigate, reset]);

  const onSubmit = async (data: Menu) => {
    if (!id) return;
    try {
      const updated = await updateMenu(Number(id), data);
      if (updated) {
        Swal.fire({title:"Menu actualizado con éxito",icon:"success",confirmButtonText:"Aceptar",confirmButtonColor: "#28a745"});
        navigate("/list-Menu");
      } else {
        Swal.fire({title:"Error actualizando Menu",icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
      }
    } catch (error) {
      console.error("Error actualizando Menu:", error);
      Swal.fire({title:"Error actualizando Menu",icon:"error",confirmButtonText:"Aceptar",confirmButtonColor: "#dc3545"});
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Menú</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID del Restaurante</label>
          <input type="number" {...register("restaurant_id", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID del Producto</label>
          <input type="number" {...register("product_id", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio</label>
          <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="mt-1 block w-full border rounded p-2" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" {...register("availability")} id="availability" className="mr-2" />
          <label htmlFor="availability" className="text-sm font-medium text-gray-700">Disponible</label>
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
          Actualizar Menú
        </button>
      </form>
    </div>
  );
};

export default EditMenu;
