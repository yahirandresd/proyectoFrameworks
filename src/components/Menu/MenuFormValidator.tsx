import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Menu } from "../../models/Menu";

type MenuFormData = Omit<Menu, "id">;

const schema = yup.object().shape({
  price: yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required")
    .max(1000, "Price cannot exceed $1000"),
  availability: yup.boolean()
    .required("Availability status is required")
    .default(true),
});

interface Props {
  initialData?: Menu;
  onSubmit: (data: MenuFormData) => void;
}

const MenuFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MenuFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      price: 0,
      availability: true,
      restaurant_id: 0,
      product_id: 0
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="availability"
            {...register("availability")}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="availability" className="ml-2 block text-sm text-gray-700">
            Available
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {initialData ? "Update Menu" : "Create Menu"}
      </button>
    </form>
  );
};

export default MenuFormValidator;