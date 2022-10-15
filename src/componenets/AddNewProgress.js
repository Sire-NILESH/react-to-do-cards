import React from "react";
import { useForm } from "react-hook-form";

function AddNewProgress(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onFormSubmitHandler = (data) => {
    props.formDataHandler(data);
    reset();
    props.showNewItemHandler(false);
  };
  // w-[8.5rem]
  return (
    <form
      onSubmit={handleSubmit(onFormSubmitHandler)}
      className="absolute left-0 -top-1 z-10 flex w-[8.5rem] flex-col gap-2"
    >
      <div className="w-full">
        <input
          type="text"
          placeholder="Add a progress"
          className="font-sm full rounded-full px-2 py-1 text-slate-500 shadow-sm focus:outline-none dark:bg-slate-700 dark:text-slate-300 dark:shadow-2xl"
          {...register("title", { required: true, maxLength: 18 })}
        />
        {/* error message */}
        <div className="ml-8 text-center">
          {errors.title?.type === "required" && (
            <span className="text-xs text-red-500 "> Cannot be empty</span>
          )}
          {errors.title?.type === "maxLength" && (
            <span className="text-xs text-red-500">
              {" "}
              Cannot be more than 18 characters
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1">
        <button
          type="submit"
          className="w-14 rounded-full bg-blue-500 px-2 py-1 shadow-md"
        >
          Add
        </button>
        <button
          type="button"
          className="w-14 rounded-full px-2 py-1 text-slate-500 shadow-md dark:ring-1"
          onClick={() => props.showNewItemHandler(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddNewProgress;
