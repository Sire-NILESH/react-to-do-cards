import React, { useState } from "react";
import Date from "./Date";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import CardModal from "./CardModal";
import AddNewProgress from "./AddNewProgress";
import AddNewCommentForm from "./AddNewCommentForm";

function CardDescription(props) {
  const [showAddNewItemForm, setShowNewItemForm] = useState(false);
  const [progressData, setProgressData] = useState();
  const [commentData, setCommentData] = useState();
  const card = props.cardToShow;
  const topCommentors =
    card.comments &&
    card.comments.filter((c, i) => {
      return i < 3;
    });

  const currentUser = {
    userId: "hgfiye598",
    userName: "Filimon Osmond",
    photoId: "sldjroi",
  };

  const priorityColorCode = {
    low: "bg-cyan-400 hover:bg-cyan-500",
    medium: "bg-yellow-300 hover:bg-yellow-400",
    high: "bg-red-500 hover:bg-red-600 !text-white",
  };

  const showNewItemHandler = (flag) => {
    setShowNewItemForm(flag);
  };

  const setProgressDataHandler = (data) => {
    console.log(data);
    setProgressData(data);
  };

  const setCommentDataHandler = (data) => {
    console.log(data);
    setCommentData(data);
  };

  return (
    <CardModal
      title={card.title}
      openHandler={props.openHandler}
      closeHandler={props.closeHandler}
      isOpen={props.isOpen}
      cardToShow={props.cardToShow}
    >
      {/* -- row 2 -- */}
      <div className="grid sm:grid-cols-3 items-center justify-between gap-8 sm:gap-0 md:gap-8">
        <span
          className={`uppercase font-semibold text-base tracking-widest md:tracking-[4px] text-slate-600 ${
            priorityColorCode[card.priority]
          } px-2 md:px-6 py-2 w-full sm:w-28 md:w-32 h-10 rounded-full transition-colors duration-300 ease-out text-center col-span-2 sm:col-span-1`}
        >
          {card.priority}
        </span>

        {card.date ? (
          <Date
            className="px-2 md:px-6 py-2 w-full sm:!w-28 h-10"
            date={card.date}
          />
        ) : (
          <div></div>
        )}

        {card.comments && (
          // commenter's images
          <div className="flex items-center gap-1">
            {topCommentors &&
              topCommentors.map((c) => {
                return (
                  <img
                    src={`users/${c.photoId}.jpg`}
                    className="border-2 rounded-full bg-slate-300 w-10 h-10"
                    alt={`${card.comments[0].userName}`}
                  />
                );
              })}
            {/* <img
              src={`users/${card.comments[0].photoId}.jpg`}
              className="border-2 rounded-full bg-slate-300 w-10 h-10"
              alt={`${card.comments[0].userName}`}
            />
            <img
              src={`users/${card.comments[1].photoId}.jpg`}
              className="border-2 rounded-full bg-slate-300 w-10 h-10"
              alt={`${card.comments[1].userName}`}
            />
            <img
              src={`users/${card.comments[2].photoId}.jpg`}
              className="border-2 rounded-full bg-slate-300 w-10 h-10"
              alt={`${card.comments[1].userName}`}
            /> */}
            <p className="tracking-widest">...</p>
            {/* <a
              href="/"
              className="text-slate-500 w-8 h-8 shadow-btn rounded-full flex items-center justify-center"
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
            </a> */}
          </div>
        )}
      </div>

      {/* -- row 3 -- */}
      <div className="block sm:flex items-start  sm:gap-4">
        {/* -- col 1 -- */}
        <div className=" sm:w-[60%] space-y-4 mb-6 sm:mb-0">
          <p className="text-normal font-semibold text-slate-600">
            Description
          </p>

          <ul className="space-y-4">
            {card &&
              card.description.map((descPoint) => {
                return <li className="text-xs text-slate-500">{descPoint}</li>;
              })}
          </ul>
        </div>
        {/* -- col 2 -- */}
        <div className="space-4 mb-6 sm:mb-0">
          <p className="text-normal font-semibold text-slate-600 mb-4">
            Overall progress
          </p>
          <ul className="space-y-4 flex flex-col justify-start">
            {card &&
              card.overallProgress.map((progress) => {
                return (
                  <li
                    className={`text-xs text-slate-500 ${
                      progress.done && "line-through"
                    }  flex items-center`}
                  >
                    {progress.done ? (
                      <FiCheckCircle className="h-4 w-4 text-slate-500 hover:text-slate-600 inline-block mr-4 transition-colors duration-300 ease-out cursor-pointer" />
                    ) : (
                      <FiCircle className="h-4 w-4 text-slate-500 hover:text-slate-600 inline-block mr-4 transition-colors duration-300 ease-out cursor-pointer" />
                    )}

                    {progress.title}
                  </li>
                );
              })}

            {/* -- add new items -- */}

            <li className="text-xs text-slate-300 flex items-start gap-3 relative h-5">
              {!showAddNewItemForm && (
                <button type="button" onClick={() => showNewItemHandler(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-slate-500 cursor-pointer "
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
              )}
              {!showAddNewItemForm ? (
                "Add an item"
              ) : (
                <AddNewProgress
                  showNewItemHandler={showNewItemHandler}
                  formDataHandler={setProgressDataHandler}
                />
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* -- row 4 -- */}
      <div className="flex flex-col gap-4 mb-5">
        <p className="font-semibold text-base text-slate-600">Activity</p>
        {/* -- add comment box -- */}
        <AddNewCommentForm
          formDataHandler={setCommentDataHandler}
          currentUser={currentUser}
        />
      </div>
      {/* -- comments -- */}
      {card.totalComments > 0 && (
        <div className="h-full w-full px-8 space-y-4">
          {card.comments.map((c) => {
            return (
              //  posted comment box
              <div className="flex gap-4" key={c.commentId}>
                {/* -- user image -- */}
                <img
                  src={`users/${c.photoId}.jpg`}
                  className="h-6 w-6 rounded-full inline-block"
                  alt={`${c.userName}`}
                />
                <p className="text-slate-500 text-xs">{c.comment}</p>
              </div>
            );
          })}
        </div>
      )}
    </CardModal>
  );
}

export default CardDescription;
