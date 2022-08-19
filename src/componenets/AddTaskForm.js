import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CardModal from "./CardModal";

function AddTaskForm(props) {
  const [selected, setSelected] = useState(
    props.type === "edit" ? props.currentCategory : ""
  );
  const [taskTitle, setTaskTitle] = useState();

  const taskTitleOnChangeHandler = (e) => {
    setTaskTitle(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSelectColorCode = () =>
    "bg-green-300 hover:bg-green-300 ring-0 duration-0";

  const categoryHandler = (selectedCategory) => {
    setSelected(selectedCategory);
  };

  const onFormSubmitHandler = (data) => {
    let formData = {};
    if (!selected) {
      formData = { selected: "personalTasks" };
    } else {
      formData = { selected };
    }
    data.task ? (formData.task = data.task) : (formData.task = "Untitled");
    console.log(formData);
    props.setFormData(formData);
    reset();
    props.closeHandler();
  };

  return (
    <div>
      <CardModal
        title={props.type === "edit" ? "Edit a task" : "Add a new Task"}
        openHandler={props.openHandler}
        closeHandler={props.closeHandler}
        isOpen={props.isOpen}
        variant="short"
      >
        <div className="mt-0">
          {props.type === "edit" ? (
            <p className="text-left text-slate-500 mb-6 text-base">
              You are editing the{" "}
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                {props.currentTitle}{" "}
              </span>
              task
            </p>
          ) : (
            <p className="text-left text-slate-500 mb-6 text-base">
              Default is{" "}
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Personal category
              </span>
              .
            </p>
          )}

          {/* -- form box -- */}
          <form className="w-full" onSubmit={handleSubmit(onFormSubmitHandler)}>
            <p className="text-left text-slate-400 mb-4 text-sm">
              Select Category for the task
            </p>

            <div className="flex mb-12 items-center space-x-6">
              <button
                type="button"
                className={`uppercase font-semibold text-sm md:text-normal tracking-widest md:tracking-[4px] text-slate-600 hover:bg-green-100  p-2 md:px-6 py-2 flex-1  h-10 rounded-full transition-colors duration-300 ease-out text-center ring-2 ring-gray-200 ${
                  selected === "designTeamTasks" && onSelectColorCode()
                }`}
                onClick={() => categoryHandler("designTeamTasks")}
              >
                Design Team
              </button>
              <button
                type="button"
                className={`uppercase font-semibold text-sm md:text-normal tracking-widest md:tracking-[4px] text-slate-600 hover:bg-green-100  p-2 md:px-6 py-2 flex-1 h-10 rounded-full transition-colors duration-300 ease-out text-center ring-2 ring-gray-200 ${
                  selected === "personalTasks" && onSelectColorCode()
                }`}
                onClick={() => categoryHandler("personalTasks")}
              >
                Personal
              </button>
            </div>

            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="w-52 border-t-2 border-slate-300"></div>
              <p className="text-center text-slate-400">Details</p>
              <div className="w-52 border-t-2 border-slate-300"></div>
            </div>

            {/* -- inputs -- */}
            <div className="mb-12">
              <label
                htmlFor="cardTitle"
                className="block mb-1 font-semibold text-slate-500"
              >
                Task title
              </label>
              <input
                type="text"
                value={
                  taskTitle
                    ? taskTitle
                    : props.currentTitle && props.currentTitle
                }
                className="shadow-md bg-[#f2f2ff] border-t-2 border-l-2 border-white block text-slate-600 w-full px-5 py-2 rounded-full myinput font-poppins placeholder:text-sm"
                placeholder="Untitled"
                id="taskName"
                {...register("task", { maxLength: 22 })}
                onChange={taskTitleOnChangeHandler}
              />
              {/* error message */}
              <div>
                {errors.title?.type === "maxLength" && (
                  <span className="text-xs text-red-500">
                    {" "}
                    Title cannot be more than 22 characters
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-full p-2 text-white text-center font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-lg"
            >
              {props.type === "edit" ? "Update Task" : "Create Task"}
            </button>
          </form>
        </div>
      </CardModal>
    </div>
  );
}

export default AddTaskForm;
