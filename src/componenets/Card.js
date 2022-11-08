import React, { useState } from "react";
import Date from "./Date";
import CardsMore from "./CardsMore";
import CardDescription from "./CardDescription";
import CardForm from "./CardForm";

function Card(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [cardToShow, setCardToSHow] = useState({});

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
      <div className="card-todo card-dark-mode group  w-full space-y-2 border-t-2 border-l-2 border-[#fdfbfb] p-4 transition-colors duration-300 ease-out hover:!shadow-md  dark:border-2 dark:border-gray-800 dark:bg-gray-800 dark:!shadow-none dark:hover:border-gray-900 ">
        <header className="flex items-center justify-between">
          <div
            className={`h-2 w-20 ${
              priorityColorCode[props.card.priority]
            } cursor-pointer rounded-full px-6 transition-all duration-300 ease-out group-hover:w-28`}
          ></div>
          <CardsMore
            cardId={props.card.cardId}
            cardCategory={props.cardCategory}
            openModal={openEditModal}
          >
            <button type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="transition-text h-6 w-6 cursor-pointer  text-slate-400 duration-300 ease-out  hover:text-slate-600 dark:group-hover:text-slate-800
                dark:group-hover:hover:text-white"
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
        <div className="flex cursor-pointer flex-col gap-4" onClick={openModal}>
          <p className="text-sm font-semibold text-slate-500 dark:group-hover:text-white">
            {props.card.title}
          </p>
          {props.card.date && <Date size="md" date={props.card.date} />}
          <div className="flex items-center justify-between">
            {props.card.totalComments && (
              <p className="text-xs tracking-wide text-slate-400 dark:group-hover:text-slate-300">
                {props.card.totalComments} comments
              </p>
            )}

            {/* <!-- member's images --> */}
            {props.card.comments && props.card.comments.length > 0 && (
              <div className="flex gap-1">
                {props.card.comments.map((c, i) => {
                  if (i < 2) {
                    return (
                      <img
                        key={i}
                        src={`users/${props.card.comments[i].photoId}.jpg`}
                        className="h-6 w-6 rounded-full"
                        alt={`${props.card.comments[0].userName}`}
                      />
                    );
                  } else {
                    return null;
                  }
                })}

                <span className="tracking-widest text-slate-400">...</span>
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
          title={props.title}
          cardCategory={props.cardCategory}
          cardId={cardToShow.cardId}
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
          card={{
            title: cardToShow.title,
            date: cardToShow.date,
            priority: cardToShow.priority,
            description: cardToShow.description,
            cardId: cardToShow.cardId,
            unprocessedDate: cardToShow.unprocessedDate,
          }}
          type="editing"
          cardCategory={props.cardCategory}
        />
      )}
    </div>
  );
}

export default Card;
