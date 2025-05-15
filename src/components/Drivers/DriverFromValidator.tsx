import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Driver } from "../../models/Driver";

type DriverFormData = Omit<Driver, "id">;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  license_number: yup.string().required("License number is required"),
  phone: yup.string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Only numbers allowed"),
  email: yup.string().email("Invalid email").required("Email is required"),
  status: yup.string().required("Status is required"),
});

interface Props {
  initialData?: Driver;
  onSubmit: SubmitHandler<DriverFormData>;
}

const DriverFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DriverFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: "",
      license_number: "",
      phone: "",
      email: "",
      status: "active", // Valor por defecto para status
    },
  });

  React.useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          {...register("name")}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">License Number</label>
        <input
          {...register("license_number")}
          className="w-full p-2 border rounded"
        />
        {errors.license_number && <p className="text-red-500 text-sm">{errors.license_number.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          {...register("phone")}
          className="w-full p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          {...register("status")}
          className="w-full p-2 border rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on_leave">On Leave</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {initialData ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default DriverFormValidator;