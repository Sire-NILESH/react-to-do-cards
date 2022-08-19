import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddNewCommentForm(props) {
  const [showButtons, setShowButtons] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onFormSubmitHandler = (data) => {
    props.formDataHandler(data);
    reset();
    setShowButtons(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmitHandler)}
      className="flex items-start justify-start space-x-2 relative"
    >
      {/* -- user image -- */}
      <img
        src={`users/${props.currentUser.photoId}.jpg`}
        className="h-8 w-8 rounded-full"
        alt={`${props.currentUser.userName}`}
      />
      <div className="w-full flex flex-col gap-2">
        <input
          type="text"
          placeholder="Write comment"
          className="card-todo py-2 px-4 rounded-full w-full h-full focus:outline-none text-sm text-slate-500 "
          {...register("comment", { required: true, maxLength: 18 })}
          onChange={() => {
            setShowButtons(true);
          }}
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
        {/* Buttons */}
        {showButtons && (
          <div className="flex gap-1 justify-end items-center absolute -bottom-8 right-0">
            <button
              type="submit"
              className="bg-blue-500 px-2 py-1 rounded-full w-20 shadow-md text-white text-sm"
            >
              Add
            </button>
            <button
              type="button"
              className=" px-2 py-1 rounded-full w-20 text-slate-500 text-sm shadow-md"
              onClick={() => {
                reset();
                setShowButtons(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default AddNewCommentForm;
