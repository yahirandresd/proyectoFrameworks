import React from "react";
import { useForm } from "react-hook-form";
import { createDriver } from "../../services/driverService"; // Ajusta la ruta si es necesario

interface DriverFormValues {
    id: number;
    name: string;
    license_number: string;
    phone: string;
    email: string;
    status: string;
}

const CreateDriver: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<DriverFormValues>();

    const onSubmit = async (data: DriverFormValues) => {
        try {
            const result = await createDriver(data); // Hace POST al backend
            if (result) {
                alert("✅ Conductor creado con éxito");
                reset();
            } else {
                alert("❌ Error al crear el C");
            }
        } catch (error) {
            alert("❌ Error inesperado");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
            <h1 className="text-2xl font-bold mb-6">Crear Conductor</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="name"{...register("name", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.name && <p className="text-red-600">El nombre es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Numero de licencia</label>
                    <input type="string"{...register("license_number", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.license_number && <p className="text-red-600">El numero de licencia es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Correo</label>
                    <input type="email" {...register("email", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.email && <p className="text-red-600">El correo es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Telefono</label>
                    <input type="phone" {...register("phone", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.phone && <p className="text-red-600">El Telefono es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <input type="string" {...register("status", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.status && <p className="text-red-600">El estado es obligatorio</p>}
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
                    Guardar Conductor
                </button>
            </form>
        </div>
    );
};

export default CreateDriver;