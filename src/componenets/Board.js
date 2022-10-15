import React, { useState, useEffect, useMemo } from "react";
import CardColumn from "./CardColumn";
import AddTaskForm from "./AddTaskForm";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { membersActions } from "../store/members-slice";
import { useDispatch } from "react-redux";

function Board() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();
  // const [taskDetails, setTaskDetails] = useState();

  // useEffect(() => {
  //   setTaskDetails(props.taskForBoard);
  // }, [props.taskForBoard]);

  const currOption = useSelector((state) => state.currentOption);
  const taskDetails = useSelector((state) =>
    state.allTasks[`${currOption?.taskType}`]?.find((task) => {
      return task.taskId === currOption.taskId;
    })
  );

  // const taskDetails = props.taskForBoard;

  console.log(taskDetails);

  // SET TEAM MEMBERS
  if (taskDetails) {
    dispatch(membersActions.setCurrentTaskMembers(taskDetails.taskTeam));
  }

  // useEffect(() => {
  //   const taskTeam = props.taskForBoard.taskTeam;
  //   if (taskTeam) dispatch(membersActions.currentTaskMembers(taskTeam));
  // }, [dispatch, props.taskForBoard?.taskTeam]);

  // TASK FORM
  function closeModal() {
    setIsOpen(false);
  }

  function closeEditModal() {
    setIsEditOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // TASKS EDIT FORM
  function openEditModal() {
    setIsEditOpen(true);
  }

  const addNewTaskHandler = () => {
    setIsOpen(true);
  };

  const editTaskHandler = () => {
    setIsEditOpen(true);
  };

  if (!currOption.taskId)
    return (
      <div className="flex h-full w-full items-center justify-center text-3xl font-semibold tracking-widest text-slate-300 xl:mt-36 xl:ml-20 xl:block ">
        Nothing to see here &nbsp; :-(
      </div>
    );
  return (
    <>
      <section className="w-full px-6 md:mr-8 md:px-0">
        <header className="mt-1 mb-4 flex w-full items-center justify-between">
          <h3 className="text-normal col-span-3 font-semibold text-slate-600 dark:text-slate-300 lg:text-2xl">
            {taskDetails && taskDetails.task}
          </h3>
          {/* <!-- add tasks button grp --> */}
          <div className="flex space-x-6 lg:mr-32">
            {/* Edit Task Button */}
            <button
              type="button"
              className="shadow-btn flex h-10 w-10 items-center justify-center rounded-full text-slate-500 dark:border-0 dark:bg-slate-800 dark:shadow-none lg:h-12 lg:w-12"
              onClick={editTaskHandler}
            >
              <FiEdit className="h-4 w-4 lg:h-5 lg:w-5 " />
            </button>

            {/* Add Task Button */}
            <button
              type="button"
              className="shadow-btn-blue flex h-10 w-36 items-center justify-center rounded-full !bg-blue-700 text-sm font-light uppercase tracking-widest text-slate-100 transition-colors duration-200 ease-out hover:!bg-blue-600 dark:shadow-none lg:h-12 lg:w-48 lg:tracking-[5px]"
              onClick={addNewTaskHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              &nbsp; Add task
            </button>
          </div>
        </header>

        {/* -- CARDS GO HERE -- */}
        <div className="grid h-full w-full grid-cols-1  items-start  gap-14 overflow-auto pr-4 pb-80 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {/* -- COL-1 -- */}
          {taskDetails && (
            <>
              <CardColumn
                cards={taskDetails.backLogCards}
                title="backLog"
                taskName={taskDetails.task}
              />
              <CardColumn
                cards={taskDetails.todoCards}
                title="todo"
                taskName={taskDetails.task}
              />
              <CardColumn
                cards={taskDetails.inProgressCards}
                title="in progress"
                taskName={taskDetails.task}
              />
              <CardColumn
                cards={taskDetails.doneCards}
                title="done"
                taskName={taskDetails.task}
              />
            </>
          )}
        </div>

        {/* Add new task form */}
        {isOpen && (
          <AddTaskForm
            openHandler={openModal}
            closeHandler={closeModal}
            isOpen={isOpen}
          />
        )}
        {/* Edit task form */}
        {isEditOpen && (
          <AddTaskForm
            openHandler={openEditModal}
            closeHandler={closeEditModal}
            isOpen={isEditOpen}
            type="edit"
            currentTitle={taskDetails && taskDetails.task}
            taskType={currOption.taskType}
            taskId={currOption.taskId}
          />
        )}
      </section>
    </>
  );
}

export default Board;
