import React from "react";
import { useForm } from "react-hook-form";
import { createShift } from "../../services/shiftService"; // Ajusta la ruta si es necesario

interface ShiftFormValues {
    start_time: Date;
    end_time: Date;
    status: string;
    driver_id: number;
    motorcycle_id: number;
}

const CreateShift: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ShiftFormValues>();

    const onSubmit = async (data: ShiftFormValues) => {
        try {
            const result = await createShift(data); // Hace POST al backend
            if (result) {
                alert("✅ Turno creado con éxito");
                reset();
            } else {
                alert("❌ Error al crear el Turno");
            }
        } catch (error) {
            alert("❌ Error inesperado");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow text-black">
            <h1 className="text-2xl font-bold mb-6">Crear Turno</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha inicio</label>
                    <input type="date"{...register("start_time", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.start_time && <p className="text-red-600">La fecha es obligatoria</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha fin</label>
                    <input type="date"{...register("end_time", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.end_time && <p className="text-red-600">La fecha es obligatoria</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <input type="string" {...register("status", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.status && <p className="text-red-600">El estado es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Id motocicleta</label>
                    <input type="number" {...register("motorcycle_id", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.motorcycle_id && <p className="text-red-600">El id es obligatorio</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Id conductor</label>
                    <input type="number" {...register("driver_id", { required: true })} className="mt-1 block w-full border rounded p-2" />
                    {errors.driver_id && <p className="text-red-600">El id es obligatorio</p>}
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700">
                    Guardar Turno
                </button>
            </form>
        </div>
    );
};

export default CreateShift;
