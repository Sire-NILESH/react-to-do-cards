import React, { useState } from "react";
import CardColumn from "./CardColumn";
import AddTaskForm from "./AddTaskForm";
import { FiEdit } from "react-icons/fi";

function Board(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newTaskAddedFormData, setNewTaskAddedFormData] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function closeEditModal() {
    setIsEditOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function openEditModal() {
    setIsEditOpen(true);
  }

  const addNewTaskHandler = () => {
    setIsOpen(true);
  };

  const editTaskHandler = () => {
    setIsEditOpen(true);
  };

  return (
    <section className="w-full px-6 md:px-0 md:mr-8">
      <header className="flex justify-between mt-1 mb-4 w-full items-center">
        <h3 className="col-span-3 text-normal lg:text-2xl font-semibold text-slate-600">
          {props.tasksForBoard[0].task}
        </h3>
        {/* <!-- add tasks button grp --> */}
        <div className="flex space-x-6 lg:mr-32">
          {/* Edit Task Button */}
          <button
            type="button"
            className="text-slate-500 w-10 h-10 lg:w-12 lg:h-12 shadow-btn rounded-full flex items-center justify-center"
            onClick={editTaskHandler}
          >
            {/* <svg
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg> */}
            <FiEdit className="h-4 w-4 lg:h-6 lg:w-6 " />
          </button>

          {/* Add Task Button */}
          <button
            type="button"
            className="!bg-blue-700 hover:!bg-blue-600 uppercase font-light text-sm tracking-widest lg:tracking-[5px] text-slate-100 w-36 h-10 lg:w-48 lg:h-12 shadow-btn-blue rounded-full flex items-center justify-center transition-colors duration-200 ease-out"
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
      <div className="w-full h-full grid grid-cols-1  sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-14 items-start overflow-auto pr-4 pb-80">
        {/* -- COL-1 -- */}
        <CardColumn
          cards={props.tasksForBoard[0].backLogCards}
          title="BackLog"
          taskName={props.tasksForBoard[0].task}
        />
        <CardColumn
          cards={props.tasksForBoard[0].todoCards}
          title="todo"
          taskName={props.tasksForBoard[0].task}
        />
        <CardColumn
          cards={props.tasksForBoard[0].inProgressCards}
          title="in progress"
          taskName={props.tasksForBoard[0].task}
        />
        <CardColumn
          cards={props.tasksForBoard[0].doneCards}
          title="done"
          taskName={props.tasksForBoard[0].task}
        />
      </div>

      {/* Add new task form */}
      {isOpen && (
        <AddTaskForm
          openHandler={openModal}
          closeHandler={closeModal}
          isOpen={isOpen}
          setFormData={setNewTaskAddedFormData}
        />
      )}
      {/* Edit task form */}
      {isEditOpen && (
        <AddTaskForm
          openHandler={openEditModal}
          closeHandler={closeEditModal}
          isOpen={isEditOpen}
          setFormData={setNewTaskAddedFormData}
          type="edit"
          currentTitle={props.tasksForBoard[0].task}
          currentCategory={props.currentCategory}
        />
      )}
    </section>
  );
}

export default Board;
