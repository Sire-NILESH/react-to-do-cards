import React, { useState } from "react";
import CardForm from "./CardForm";

function AddNewCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    //   -- add new cards --  }
    <div className="flex items-center gap-3">
      <button type="button" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <span className="text-sm font-semibold text-slate-300">Add new card</span>

      {isOpen && (
        <CardForm
          openHandler={openModal}
          closeHandler={closeModal}
          isOpen={isOpen}
          title={props.title}
          taskName={props.taskName}
          setFormData={setFormData}
          type="adding"
          cardCategory={props.cardCategory}
        />
      )}
    </div>
  );
}

export default AddNewCard;
