import React from "react";
import { useForm } from "react-hook-form";
import { createAddress } from "../../services/addressService"; // Ajusta la ruta si es necesario

interface AddressFormValues {
    id: number;
    order_id: number;
    street: string; // Calle
    city: string; // Ciudad
    state: string; // Estado
    postal_code: string; // Código postal
    additional_info: string; // Información adicional
}

const CreateAddress: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddressFormValues>();

    const onSubmit = async (data: AddressFormValues) => {
        try {
            const result = await createAddress(data); // Hace POST al backend
            if (result) {
                alert("✅ Direccion creada con éxito");
                reset();
            } else {
                alert("❌ Error al crear la Direccion");
            }
        } catch (error) {
            alert("❌ Error inesperado");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
            <h1 className="text-2xl font-bold mb-6">Crear Direccion</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Calle</label>
                    <input type="string"{...register("street", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.street && <p className="text-red-600">La Calle es obligatoria</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                    <input type="string" {...register("city", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.city && <p className="text-red-600">La ciudad es obligatoria</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <input type="string" {...register("state", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.state && <p className="text-red-600">El estado es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Codigo postal</label>
                    <input type="string" {...register("postal_code", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.postal_code && <p className="text-red-600">El codigo postal es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Id orden</label>
                    <input type="number" {...register("order_id", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.order_id && <p className="text-red-600">El id de la orden es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Informacion adicional</label>
                    <input type="string" {...register("additional_info", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.additional_info && <p className="text-red-600">La informacion es obligatoria</p>}
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
                    Guardar Direccion
                </button>
            </form>
        </div>
    );
};

export default CreateAddress;
