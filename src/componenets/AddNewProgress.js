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
      className="flex flex-col gap-2 w-[8.5rem] absolute left-0 -top-1 z-10"
    >
      <div className="w-full">
        <input
          type="text"
          placeholder="Add a progress"
          className="text-slate-500 font-sm px-2 py-1 rounded-full shadow-sm full"
          {...register("title", { required: true, maxLength: 18 })}
        />
        {/* error message */}
        <div className="text-center ml-8">
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

      <div className="flex gap-1 justify-end items-center">
        <button
          type="submit"
          className="bg-blue-500 px-2 py-1 rounded-full w-14 shadow-md"
        >
          Add
        </button>
        <button
          type="button"
          className=" px-2 py-1 rounded-full w-14 text-slate-500 shadow-md"
          onClick={() => props.showNewItemHandler(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddNewProgress;
