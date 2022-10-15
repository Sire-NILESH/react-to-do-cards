import React, { useState } from "react";
import Date from "./Date";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import CardModal from "./CardModal";
import AddNewProgress from "./AddNewProgress";
import AddNewCommentForm from "./AddNewCommentForm";
import { useSelector, useDispatch } from "react-redux";
import { allTasksActions } from "../store/all-tasks-slice";

function CardDescription(props) {
  const [showAddNewItemForm, setShowNewItemForm] = useState(false);
  const [allProgressData, setAllProgressData] = useState(
    props.cardToShow && props.cardToShow.overallProgress
      ? props.cardToShow.overallProgress
      : []
  );
  const [allCommentsData, setAllCommentsData] = useState(
    props.cardToShow && props.cardToShow.comments
      ? props.cardToShow.comments
      : []
  );

  const [commentData, setCommentData] = useState();
  const card = props.cardToShow;
  const topCommentors =
    card.comments &&
    card.comments.filter((c, i) => {
      return i < 3;
    });

  const currentUser = useSelector((state) => state.currentUser);
  const currOption = useSelector((state) => state.currentOption);
  const dispatch = useDispatch();

  // const currentUser = {
  //   userId: "hgfiye598",
  //   userName: "Filimon Osmond",
  //   photoId: "sldjroi",
  // };

  const priorityColorCode = {
    low: "bg-cyan-400 hover:bg-cyan-500",
    medium: "bg-yellow-300 hover:bg-yellow-400",
    high: "bg-red-500 hover:bg-red-600 !text-white",
  };

  const showNewItemHandler = (flag) => {
    setShowNewItemForm(flag);
  };

  const setCheckedProgressDataHandler = (data, i, flag) => {
    const dataTemp = { ...data };
    dataTemp.done = flag;

    dispatch(
      allTasksActions.checkProgress({
        taskId: currOption.taskId,
        taskType: currOption.taskType,
        cardId: props.cardId,
        category: props.cardCategory,
        index: i,
        update: dataTemp,
      })
    );

    setAllProgressData((prevState) => {
      const temp = [...prevState];
      temp[i] = dataTemp;
      return [...temp];
    });
  };

  const setProgressDataHandler = (data) => {
    data.done = false;

    const finalData = {
      taskId: currOption.taskId,
      taskType: currOption.taskType,
      cardId: props.cardId,
      category: props.cardCategory,
      update: data,
    };

    dispatch(allTasksActions.addProgress(finalData));

    setAllProgressData((prevState) => {
      return [...prevState, data];
    });
    // setProgressData(data);
  };

  const setCommentDataHandler = ({ comment }) => {
    let newComment = { comment, ...currentUser };

    setAllCommentsData((prevState) => {
      return prevState.length > 0 ? [...prevState, newComment] : [newComment];
    });
    setCommentData(newComment);
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
      <div className="grid items-center justify-between gap-8 sm:grid-cols-3 sm:gap-0 md:gap-6">
        <span
          className={`text-base font-semibold uppercase tracking-widest text-slate-600 md:tracking-[4px] ${
            priorityColorCode[card.priority]
          } col-span-2 h-10 w-full rounded-full px-2 py-2 text-center transition-colors duration-300 ease-out sm:col-span-1 sm:w-28 md:w-32 md:px-6`}
        >
          {card.priority}
        </span>

        {card.date ? (
          <Date
            className="h-10 w-full px-2 py-2 sm:!w-28 md:px-4"
            date={card.date}
          />
        ) : (
          <div></div>
        )}

        {card.comments && (
          // commenter's images
          <div className="flex items-center gap-1">
            {topCommentors &&
              topCommentors.map((c, i) => {
                return (
                  <img
                    src={`users/${c.photoId}.jpg`}
                    className="h-10 w-10 rounded-full border-2 bg-slate-300 dark:border-gray-600"
                    alt={`${card.comments[0].userName}`}
                    key={i}
                  />
                );
              })}

            <p className="tracking-widest">...</p>
          </div>
        )}
      </div>

      {/* -- row 3 -- */}
      <div className="block min-h-[12rem] items-start sm:flex  sm:gap-4">
        {/* -- col 1 -- */}
        <div className=" mb-6 space-y-4 sm:mb-0 sm:w-[60%]">
          <p className="text-normal font-semibold text-slate-600 dark:text-slate-300">
            Description
          </p>

          <ul className="space-y-4">
            {card &&
              card.description.map((descPoint, i) => {
                return (
                  <li key={i} className="text-xs text-slate-500">
                    {descPoint}
                  </li>
                );
              })}
          </ul>
        </div>
        {/* -- col 2 -- */}
        <div className="space-4 mb-6 sm:mb-0">
          <p className="text-normal mb-4 font-semibold text-slate-600 dark:text-slate-300">
            Overall progress
          </p>
          <ul className="flex flex-col justify-start space-y-4">
            {card &&
              allProgressData &&
              allProgressData.map((progress, i) => {
                return (
                  <li
                    key={i}
                    className={`text-xs text-slate-500 ${
                      progress.done && "line-through"
                    }  flex items-center`}
                  >
                    {progress.done ? (
                      <div className="mr-4">
                        <button
                          type="button"
                          onClick={() =>
                            setCheckedProgressDataHandler(progress, i, false)
                          }
                        >
                          <FiCheckCircle className="inline-block h-4 w-4 cursor-pointer text-slate-500  transition-colors duration-300 ease-out hover:text-slate-600" />
                        </button>
                      </div>
                    ) : (
                      <div className="mr-4">
                        <button
                          type="button"
                          onClick={() =>
                            setCheckedProgressDataHandler(progress, i, true)
                          }
                        >
                          <FiCircle className="inline-block h-4 w-4 cursor-pointer text-slate-500 transition-colors duration-300 ease-out hover:text-slate-600" />
                        </button>
                      </div>
                    )}

                    {progress.title}
                  </li>
                );
              })}

            {/* -- add new items -- */}

            <li className="relative flex h-5 items-start gap-3 text-xs text-slate-300">
              {!showAddNewItemForm && (
                <button type="button" onClick={() => showNewItemHandler(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 cursor-pointer text-slate-500 "
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
      <div className="mb-5 flex flex-col gap-4">
        <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
          Activity
        </p>
        {/* -- add comment box -- */}
        <AddNewCommentForm
          formDataHandler={setCommentDataHandler}
          currentUser={currentUser}
          cardCategory={props.cardCategory}
          cardId={card?.cardId}
        />
      </div>
      {/* -- comments -- */}
      {allCommentsData && (
        <div className="h-full w-full space-y-4 px-8">
          {allCommentsData.map((c, i) => {
            return (
              //  posted comment box
              <div className="flex gap-4" key={i}>
                {/* -- user image -- */}
                <img
                  src={`users/${c.photoId}.jpg`}
                  className="inline-block h-6 w-6 rounded-full"
                  alt={`${c.userName}`}
                />
                <p className="text-xs text-slate-500">{c.comment}</p>
              </div>
            );
          })}
        </div>
      )}
    </CardModal>
  );
}

export default CardDescription;
