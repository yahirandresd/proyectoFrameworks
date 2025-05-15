import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Motorcycle } from "../../models/Motorcycle";

type MotorcycleFormData = Omit<Motorcycle, "id">;

const schema = yup.object().shape({
  license_plate: yup.string()
    .required("License plate is required")
    .matches(/^[A-Z0-9]+$/, "Only uppercase letters and numbers")
    .max(10, "License plate cannot exceed 10 characters"),
  brand: yup.string()
    .required("Brand is required")
    .max(50, "Brand cannot exceed 50 characters"),
  year: yup.number()
    .typeError("Year must be a number")
    .required("Year is required")
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  status: yup.string()
    .required("Status is required")
    .oneOf(["available", "in_use", "maintenance"], "Invalid status"),
});

interface Props {
  initialData?: Motorcycle;
  onSubmit: (data: MotorcycleFormData) => void;
}

const MotorcycleFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MotorcycleFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      license_plate: "",
      brand: "",
      year: new Date().getFullYear(),
      status: "available",
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* License Plate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            License Plate
          </label>
          <input
            {...register("license_plate")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
            placeholder="ABC123"
          />
          {errors.license_plate && (
            <p className="mt-1 text-sm text-red-600">{errors.license_plate.message}</p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            {...register("brand")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
            placeholder="Honda"
          />
          {errors.brand && (
            <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
          )}
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="number"
            {...register("year")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.year && (
            <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            {...register("status")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="available">Available</option>
            <option value="in_use">In Use</option>
            <option value="maintenance">Maintenance</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {initialData ? "Update Motorcycle" : "Create Motorcycle"}
      </button>
    </form>
  );
};

export default MotorcycleFormValidator;