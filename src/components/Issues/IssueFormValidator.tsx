import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Issue } from "../../models/Issue";

type IssueFormData = Omit<Issue, "id">;

const schema = yup.object().shape({
  description: yup.string().required("Description is required"),
  issue_type: yup.string().required("Issue type is required"),
  date_reported: yup.date()
    .required("Report date is required")
    .max(new Date(), "Date cannot be in the future"),
  status: yup.string().required("Status is required"),
});

interface Props {
  initialData?: Issue;
  onSubmit: SubmitHandler<IssueFormData>;
}

const IssueFormValidator: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IssueFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      description: "",
      issue_type: "technical",
      date_reported: new Date(),
      status: "open",
    },
  });

  React.useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded"
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Issue Type</label>
        <select
          {...register("issue_type")}
          className="w-full p-2 border rounded"
        >
          <option value="technical">Technical</option>
          <option value="mechanical">Mechanical</option>
          <option value="electrical">Electrical</option>
          <option value="other">Other</option>
        </select>
        {errors.issue_type && <p className="text-red-500 text-sm">{errors.issue_type.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Date Reported</label>
        <input
          type="date"
          {...register("date_reported")}
          onChange={(e) => setValue("date_reported", new Date(e.target.value))}
          max={new Date().toISOString().split('T')[0]}
          className="w-full p-2 border rounded"
        />
        {errors.date_reported && <p className="text-red-500 text-sm">{errors.date_reported.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          {...register("status")}
          className="w-full p-2 border rounded"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
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

export default IssueFormValidator;