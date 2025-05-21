import React from "react";
import { useForm } from "react-hook-form";
import { createRestaurant } from "../../services/restaurantService"; // Ajusta la ruta si es necesario

interface RestaurantFormValues {
    name: string;
    address: string;
    phone: string;
    email: string;
}

const CreateRestaurant: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RestaurantFormValues>();

    const onSubmit = async (data: RestaurantFormValues) => {
        try {
            const result = await createRestaurant(data); // Hace POST al backend
            if (result) {
                alert("✅ Restaurante creado con éxito");
                reset();
            } else {
                alert("❌ Error al crear el Restaurante");
            }
        } catch (error) {
            alert("❌ Error inesperado");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
            <h1 className="text-2xl font-bold mb-6">Crear Restaurante</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="name"{...register("name", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.name && <p className="text-red-600">El nombre es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Direccion</label>
                    <input type="string"{...register("address", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.address && <p className="text-red-600">La direccion es obligatoria</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input {...register("phone", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.phone && <p className="text-red-600">El teléfono es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" {...register("email", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.email && <p className="text-red-600">El email es obligatorio</p>}
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
                    Guardar Restaurante
                </button>
            </form>
        </div>
    );
};

export default CreateRestaurant;
