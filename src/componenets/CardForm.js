import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CardModal from "./CardModal";
import { useSelector, useDispatch } from "react-redux";
import { allTasksActions } from "../store/all-tasks-slice";

function CardForm(props) {
  const [priority, setPriority] = useState(props.card && props.card.priority);
  const [date, setDate] = useState();
  const [cardTitle, setCardTitle] = useState();
  const [cardDescription, setCardDescription] = useState();
  const [cardSection, setCardSection] = useState();
  const currOption = useSelector((state) => state.currentOption);
  const dispatch = useDispatch();

  useEffect(() => {
    setCardSection(props.cardCategory);
  }, [props.cardCategory]);

  let cardData = props.card;
  console.log(props);
  // let cardData = { date: "2022-09-03" };

  const dateOnChangeHandler = (e) => {
    setDate(e.target.value);
  };

  const cardTitleOnChangeHandler = (e) => {
    setCardTitle(e.target.value);
  };

  const cardDescOnChangeHandler = (e) => {
    setCardDescription(e.target.value);
  };

  const cardSectOnChangeHandler = (e) => {
    setCardSection(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const priorityColorCode = {
    low: "bg-cyan-400 dark:text-slate-600",
    medium: "bg-yellow-400 dark:text-slate-600",
    high: "bg-red-500 !text-white",
  };

  const priorityHandler = (selectedPriority) => {
    setPriority(selectedPriority);
  };

  const onFormSubmitHandler = (data) => {
    let formData = {};
    if (!priority) {
      formData = { priority: "low", ...data };
    } else {
      formData = { priority, ...data };
    }

    if (formData.unprocessedDate) {
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      const dateTemp = new Intl.DateTimeFormat("en-GB", options)
        .format(new Date(formData.unprocessedDate))
        .split(" ");
      const processedDate = `${dateTemp[1]} ${dateTemp[0]}, ${dateTemp[2]}`;
      formData.date = processedDate;
    }

    // formData.description.replace(/(\r\n|\n|\r)/gm, " ");
    formData.description = formData.description.split(". ");
    // formData.description = formData.description.split(". ");

    if (props.type !== "editing") {
      formData = {
        taskId: currOption.taskId,
        taskType: currOption.taskType,
        cardData: {
          ...formData,
        },
      };
      console.log(formData);
      dispatch(allTasksActions.addCard(formData));
    } else {
      formData = {
        taskId: currOption.taskId,
        taskType: currOption.taskType,
        cardData: {
          cardId: props.card.cardId,
          currentCategory: props.cardCategory,
          cardUpdates: formData,
        },
      };
      console.log(formData);
      dispatch(allTasksActions.updateCard(formData));
      if (props.currentCategory !== formData.cardData.cardUpdates.category) {
        dispatch(
          allTasksActions.moveCard({
            taskId: currOption.taskId,
            taskType: currOption.taskType,
            cardData: {
              currentCategory: props.cardCategory,
              targetCategory: formData.cardData.cardUpdates.category,
            },
          })
        );
      }
    }
    props.setFormData(formData);
    reset();
    props.closeHandler();
  };

  return (
    <CardModal
      title={props.type === "editing" ? "Editing the Card" : "Add a new Card"}
      openHandler={props.openHandler}
      closeHandler={props.closeHandler}
      isOpen={props.isOpen}
    >
      <div className="mt-0">
        <p className="mb-6 text-left text-base text-slate-500">
          {props.type === "adding"
            ? "You are adding a new Card to "
            : "You are editing a Card from "}
          <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
            {props.title}{" "}
          </span>
          section of{" "}
          <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
            {props.taskName}.
          </span>
        </p>
        {/* -- form-box -- */}
        <form className="w-full" onSubmit={handleSubmit(onFormSubmitHandler)}>
          <p className="mb-4 text-left text-sm text-slate-400">
            Set Priority for the Card
          </p>

          <div className="mb-12 flex items-center justify-between gap-4">
            <button
              type="button"
              className={`text-normal h-10 w-32 rounded-full border-2 border-cyan-400 text-center  font-semibold uppercase tracking-widest text-slate-600 shadow-sm transition-colors duration-300 ease-out hover:bg-cyan-400 dark:text-slate-300 dark:hover:text-slate-800 md:px-6 md:py-2 md:tracking-[4px] ${
                priority === "low" && priorityColorCode[priority]
              }`}
              onClick={() => priorityHandler("low")}
            >
              Low
            </button>
            <button
              type="button"
              className={`text-normal h-10 w-32 rounded-full border-2 border-yellow-400 text-center  font-semibold uppercase tracking-widest text-slate-600 shadow-sm transition-colors duration-300 ease-out hover:bg-yellow-400 dark:text-slate-300 dark:hover:text-slate-800 md:px-6 md:py-2 md:tracking-[4px] ${
                priority === "medium" && priorityColorCode[priority]
              }`}
              onClick={() => priorityHandler("medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={`text-normal h-10 w-32 rounded-full border-2 border-red-600 text-center font-semibold  uppercase tracking-widest text-slate-600 shadow-sm transition-colors duration-300 ease-out hover:bg-red-600 hover:text-white dark:text-slate-300 md:px-6 md:py-2 md:tracking-[4px] ${
                priority === "high" && priorityColorCode[priority]
              }`}
              onClick={() => priorityHandler("high")}
            >
              High
            </button>
          </div>

          <div className="mb-6 flex items-center justify-center space-x-6">
            <div className="w-52 border-t-2 border-slate-300 dark:border-slate-700"></div>
            <p className="text-center text-slate-400">Details</p>
            <div className="w-52 border-t-2 border-slate-300 dark:border-slate-700"></div>
          </div>

          {/* -- inputs -- */}
          <div className="mb-6">
            <label
              htmlFor="cardTitle"
              className="mb-1 block font-semibold text-slate-500 dark:text-slate-300"
            >
              Card Title
            </label>
            <input
              // value={cardData && cardData.title}
              value={cardTitle ? cardTitle : cardData && cardData.title}
              type="text"
              className="myinput block w-full rounded-full border-t-2 border-l-2 border-white bg-[#f2f2ff] px-5 py-2 font-poppins text-slate-600 shadow-md placeholder:text-sm dark:border-0 dark:bg-slate-600 dark:text-slate-300 dark:shadow-none"
              placeholder="mention a title"
              id="cardTitle"
              {...register("title", { required: true, maxLength: 50 })}
              onChange={cardTitleOnChangeHandler}
            />
            {/* error message */}
            <div>
              {errors.title?.type === "required" && (
                <span className="text-xs text-red-500"> Title is required</span>
              )}
              {errors.title?.type === "maxLength" && (
                <span className="text-xs text-red-500">
                  {" "}
                  Title cannot be more than 50 characters
                </span>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="cardDescription"
              className="mb-1 block font-semibold  text-slate-500 dark:text-slate-300 "
            >
              Description
            </label>
            <textarea
              type="text"
              value={
                cardDescription
                  ? cardDescription
                  : cardData && cardData.description.join(". ")
              }
              rows="5"
              className="myinput mb-2 block w-full  rounded-3xl border-t-2 border-l-2 border-white bg-[#f2f2ff] px-6 py-4 font-poppins text-slate-600 shadow-md placeholder:text-sm dark:border-none dark:bg-slate-600 dark:text-slate-300 dark:shadow-none"
              placeholder="describe the task for the card"
              id="cardDescription"
              {...register("description", { required: true, maxLength: 1000 })}
              onChange={cardDescOnChangeHandler}
            />
            {/* error message */}
            <div>
              {errors.description?.type === "required" && (
                <span className="text-xs text-red-500">
                  {" "}
                  Description is required
                </span>
              )}
              {errors.description?.type === "maxLength" && (
                <span className="text-xs text-red-500">
                  {" "}
                  Description cannot be more than 1000 characters
                </span>
              )}
            </div>
          </div>
          <div className="mb-8 flex items-start justify-between">
            <div>
              <label
                htmlFor="cardDate"
                className="mb-1 block font-semibold  text-slate-500 dark:text-slate-300"
              >
                Date
              </label>
              <input
                type="date"
                value={date ? date : cardData && cardData.unprocessedDate}
                className="shadow-inset w-full rounded-full px-5 py-1 font-poppins text-base text-slate-400 dark:border-none dark:bg-slate-600 dark:text-slate-300 dark:shadow-none md:w-48"
                id="cardDate"
                {...register("unprocessedDate")}
                onChange={dateOnChangeHandler}
              />
              {/* error message */}
              {/* <div>
                {errors.Date?.type === "required" && (
                  <span className="text-xs text-red-500">Date is required</span>
                )}
              </div> */}
            </div>

            <div>
              <label
                htmlFor="cardSection"
                className="mb-1 block font-semibold  text-slate-500 dark:text-slate-300 "
              >
                Section
              </label>
              <select
                value={
                  cardSection ? cardSection : cardData && cardData.cardSection
                }
                className="w-full rounded-full border-t-2 border-l-2 border-white bg-[#f2f2ff] px-5 py-1 font-poppins text-base font-semibold uppercase tracking-widest text-slate-500 shadow-md dark:border-none dark:bg-slate-600 dark:text-slate-400 dark:shadow-none md:w-48"
                {...register("category")}
                onChange={cardSectOnChangeHandler}
              >
                <option value="backLogCards">backlog</option>
                <option value="todoCards">todo</option>
                <option value="inProgressCards">in progress</option>
                <option value="doneCards">done</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-full bg-blue-500 p-2 text-center font-semibold text-white shadow-lg transition-colors  duration-300 hover:bg-blue-600"
          >
            {props.type === "editing" ? "Update Card" : "Create Card"}
          </button>
        </form>
      </div>
    </CardModal>
  );
}

export default CardForm;
