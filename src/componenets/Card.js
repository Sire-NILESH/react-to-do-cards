import React, { useState } from "react";
import Date from "./Date";
import CardsMore from "./CardsMore";
import CardDescription from "./CardDescription";
import CardForm from "./CardForm";

function Card(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [cardToShow, setCardToSHow] = useState({});
  const [formData, setFormData] = useState({});

  const cardToShowHandler = () => {
    setCardToSHow(props.card);
  };

  // View card
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    cardToShowHandler();
  }

  // Edit card
  function closeEditModal() {
    setIsEditOpen(false);
  }

  function openEditModal() {
    setIsEditOpen(true);
    cardToShowHandler();
  }

  const priorityColorCode = {
    low: "bg-cyan-500",
    medium: "bg-yellow-400",
    high: "bg-red-500",
  };

  return (
    <div>
      <div className="card-todo w-full p-4 space-y-2   hover:!shadow-md border-t-2 border-l-2 border-[#fdfbfb] transition-shadow duration-300 ease-out">
        <header className="flex justify-between items-center">
          <div
            className={`w-20 h-2 ${
              priorityColorCode[props.card.priority]
            } px-6 rounded-full hover:w-24 transition-all duration-300 ease-out cursor-pointer`}
          ></div>
          <CardsMore setFormData={setFormData} openModal={openEditModal}>
            <button type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-400 hover:text-slate-600 cursor-pointer transition-text duration-300 ease-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </CardsMore>
        </header>
        <div className="flex flex-col gap-4 cursor-pointer" onClick={openModal}>
          <p className="text-sm text-slate-500 font-semibold">
            {props.card.title}
          </p>
          {props.card.date && <Date size="md" date={props.card.date} />}
          <div className="flex justify-between items-center">
            {props.card.totalComments && (
              <p className="text-xs text-slate-400 tracking-wide">
                {props.card.totalComments} comments
              </p>
            )}

            {/* <!-- member's images --> */}
            {props.card.comments && (
              <div className="flex gap-1">
                <img
                  src={`users/${props.card.comments[0].photoId}.jpg`}
                  className="w-6 h-6 rounded-full"
                  alt={`${props.card.comments[0].userName}`}
                />
                <img
                  src={`users/${props.card.comments[1].photoId}.jpg`}
                  className="w-6 h-6 rounded-full"
                  alt={`${props.card.comments[1].userName}`}
                />
                <span className="text-slate-400 tracking-widest">...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Show Card Modal */}
      {isOpen && (
        <CardDescription
          openHandler={openModal}
          closeHandler={closeModal}
          isOpen={isOpen}
          cardToShow={cardToShow}
        />
      )}
      {/* Edit Card Modal */}
      {isEditOpen && (
        <CardForm
          openHandler={openEditModal}
          closeHandler={closeEditModal}
          isOpen={isEditOpen}
          title={props.title}
          taskName={props.taskName}
          setFormData={setFormData}
          card={{
            title: cardToShow.title,
            date: cardToShow.date,
            priority: cardToShow.priority,
            description: cardToShow.description,
            cardId: cardToShow.cardId,
          }}
          type="editing"
        />
      )}
    </div>
  );
}

export default Card;
