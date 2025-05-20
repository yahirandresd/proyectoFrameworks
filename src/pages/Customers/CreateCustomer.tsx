import React from "react";
import { useForm } from "react-hook-form";
import { createCustomer } from "../../services/customerService"; // Ajusta la ruta si es necesario

interface CustomerFormValues {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const CreateCustomer: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CustomerFormValues>();

    const onSubmit = async (data: CustomerFormValues) => {
        try {
            const result = await createCustomer(data); // Hace POST al backend
            if (result) {
                alert("✅ Cliente creado con éxito");
                reset();
            } else {
                alert("❌ Error al crear el Cliente");
            }
        } catch (error) {
            alert("❌ Error inesperado");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
            <h1 className="text-2xl font-bold mb-6">Crear Cliente</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="name"{...register("name", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.name && <p className="text-red-600">El nombre es obligatoria</p>}
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
                <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
                    Guardar Telefono
                </button>
            </form>
        </div>
    );
};

export default CreateCustomer;
