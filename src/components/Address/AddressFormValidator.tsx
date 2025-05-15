import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Address } from "../../models/Address";

// Definimos el tipo para los datos del formulario
type AddressFormData = {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  additional_info: string; // Asegurar que no sea undefined
};

// Esquema de validación Yup
const schema = yup.object().shape({
  street: yup.string().required("La calle es obligatoria"),
  city: yup.string().required("La ciudad es obligatoria"),
  state: yup.string().required("El estado es obligatorio"),
  postal_code: yup.string()
    .required("El código postal es obligatorio")
    .matches(/^[0-9]+$/, "Solo números permitidos"),
  additional_info: yup.string().default(""), // Asegurar valor por defecto
});

interface Props {
  initialData?: Address;
  onSubmit: SubmitHandler<AddressFormData>; // Usamos SubmitHandler
}

const AddressFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      postal_code: "",
      additional_info: "",
      ...initialData
    },
  });

  React.useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Calle</label>
        <input
          {...register("street")}
          className="w-full p-2 border rounded"
        />
        {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Ciudad</label>
          <input
            {...register("city")}
            className="w-full p-2 border rounded"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Estado</label>
          <input
            {...register("state")}
            className="w-full p-2 border rounded"
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Código Postal</label>
        <input
          {...register("postal_code")}
          className="w-full p-2 border rounded"
        />
        {errors.postal_code && <p className="text-red-500 text-sm">{errors.postal_code.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Información Adicional</label>
        <textarea
          {...register("additional_info")}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {initialData ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
};

export default AddressFormValidator;