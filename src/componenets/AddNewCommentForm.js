import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { allTasksActions } from "../store/all-tasks-slice";

function AddNewCommentForm(props) {
  const [showButtons, setShowButtons] = useState(false);
  const dispatch = useDispatch();
  const currOption = useSelector((state) => state.currentOption);
  const currUser = useSelector((state) => state.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onFormSubmitHandler = (data) => {
    dispatch(
      allTasksActions.addComment({
        taskType: currOption.taskType,
        taskId: currOption.taskId,
        userId: currUser.userId,
        userName: currUser.userName,
        photoId: currUser.photoId,
        category: props.cardCategory,
        cardId: props.cardId,
        ...data,
      })
    );
    props.formDataHandler(data);
    reset();
    setShowButtons(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmitHandler)}
      className="relative flex items-start justify-start space-x-2"
    >
      {/* -- user image -- */}
      <img
        src={`users/${props.currentUser.photoId}.jpg`}
        className="h-8 w-8 rounded-full"
        alt={`${props.currentUser.userName}`}
      />
      <div className="flex w-full flex-col gap-2">
        <input
          type="text"
          placeholder="Write comment"
          className="card-todo h-full w-full rounded-full py-2 px-4 text-sm text-slate-500 focus:outline-none dark:bg-slate-700 dark:text-slate-300 dark:shadow-2xl"
          {...register("comment", { required: true, maxLength: 100 })}
          onChange={() => {
            setShowButtons(true);
          }}
        />
        {/* error message */}
        <div className="ml-8 text-center">
          {errors.title?.type === "required" && (
            <span className="text-xs text-red-500 "> Cannot be empty</span>
          )}
          {errors.title?.type === "maxLength" && (
            <span className="mt-[96rem] text-xs text-red-500">
              {" "}
              Cannot be more than 100 characters
            </span>
          )}
        </div>
        {/* Buttons */}
        {showButtons && (
          <div className="absolute -bottom-8 right-0 flex items-center justify-end gap-1">
            <button
              type="submit"
              className="w-20 rounded-full bg-blue-500 px-2 py-1 text-sm text-white shadow-md"
            >
              Add
            </button>
            <button
              type="button"
              className=" w-20 rounded-full px-2 py-1 text-sm text-slate-500 shadow-md dark:shadow-none dark:ring-1"
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
