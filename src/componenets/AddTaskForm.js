import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CardModal from "./CardModal";
import { useDispatch } from "react-redux";
import { allTasksActions } from "../store/all-tasks-slice";
import { globalErrorActions } from "../store/global-error-slice";
import { currentOptionActions } from "../store/current-option-slice";
import { allData } from "./dummyData";

function AddTaskForm(props) {
  const [selected, setSelected] = useState(
    props.type === "edit" ? props.taskType : ""
  );
  const [taskTitle, setTaskTitle] = useState();
  const dispatch = useDispatch();

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
    "bg-lime-300 hover:bg-lime-400 ring-0 dark:text-slate-700 duration-0";

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

    const resetOptionAndEditTask = () => {
      // reset the curent option to start option
      dispatch(
        currentOptionActions.setCurrentOption({
          taskType: "designTeamTasks",
          taskId: allData[0].designTeamTasks[0].taskId,
        })
      );

      // edit task
      dispatch(
        allTasksActions.updateTask({
          update: { taskType: formData.selected, title: formData.task },
          taskType: props.taskType,
          taskId: props.taskId,
        })
      );
    };
    props.type === "edit"
      ? resetOptionAndEditTask()
      : // dispatch(currentOptionActions.setCurrentOption)

        dispatch(
          allTasksActions.addTask({
            taskType: formData.selected,
            title: formData.task,
          })
        );
    reset();

    dispatch(
      globalErrorActions.setGlobalError({
        statusCode: 400,
        message: "Failed to add task",
      })
    );
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
            <p className="mb-6 text-left text-base text-slate-500">
              You are editing the{" "}
              <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
                {props.currentTitle}{" "}
              </span>
              task
            </p>
          ) : (
            <p className="mb-6 text-left text-base text-slate-500">
              Default is{" "}
              <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Personal category
              </span>
              .
            </p>
          )}

          {/* -- form box -- */}
          <form className="w-full" onSubmit={handleSubmit(onFormSubmitHandler)}>
            <p className="mb-4 text-left text-sm text-slate-400">
              Select Category for the task
            </p>

            <div className="mb-12 flex items-center space-x-6">
              <button
                type="button"
                className={`md:text-normal h-10 flex-1 rounded-full p-2 py-2 text-center text-sm font-semibold uppercase tracking-widest  text-slate-600 ring-2 ring-gray-200 transition-colors duration-300 ease-out hover:bg-green-100 dark:text-slate-300 dark:ring-gray-700 dark:hover:text-slate-700 md:px-6 md:tracking-[4px] ${
                  selected === "designTeamTasks" && onSelectColorCode()
                }`}
                onClick={() => categoryHandler("designTeamTasks")}
              >
                Design Team
              </button>
              <button
                type="button"
                className={`md:text-normal h-10 flex-1 rounded-full p-2 py-2 text-center text-sm font-semibold uppercase tracking-widest  text-slate-600 ring-2 ring-gray-200 transition-colors duration-300 ease-out hover:bg-green-100 dark:text-slate-300 dark:ring-gray-700 dark:hover:text-slate-700 md:px-6 md:tracking-[4px] ${
                  selected === "personalTasks" && onSelectColorCode()
                }`}
                onClick={() => categoryHandler("personalTasks")}
              >
                Personal
              </button>
            </div>

            <div className="mb-6 flex items-center justify-center space-x-6">
              <div className="w-52 border-t-2 border-slate-300 dark:border-slate-700"></div>
              <p className="text-center text-slate-400">Details</p>
              <div className="w-52 border-t-2 border-slate-300 dark:border-slate-700"></div>
            </div>

            {/* -- inputs -- */}
            <div className="mb-12">
              <label
                htmlFor="cardTitle"
                className="mb-1 block font-semibold text-slate-500 dark:text-slate-300"
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
                className="myinput block w-full rounded-full border-t-2 border-l-2 border-white bg-[#f2f2ff] px-5 py-2 font-poppins text-slate-600 shadow-md placeholder:text-sm dark:border-none dark:bg-slate-600 dark:text-slate-300"
                placeholder="Untitled"
                id="taskName"
                {...register("task", { maxLength: 22 })}
                onChange={taskTitleOnChangeHandler}
              />
              {/* error message */}
              <div className="">
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
              className="block w-full rounded-full bg-blue-500 p-2 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-600"
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
