import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CardModal from "./CardModal";

function CardForm(props) {
  const [priority, setPriority] = useState(props.card && props.card.priority);
  const [date, setDate] = useState();
  const [cardTitle, setCardTitle] = useState();
  const [cardDescription, setCardDescription] = useState();
  const [cardSection, setCardSection] = useState();

  let cardData = props.card;
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
    low: "bg-cyan-400",
    medium: "bg-yellow-400",
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

    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const dateTemp = new Intl.DateTimeFormat("en-GB", options)
      .format(new Date(formData.unprocessedDate))
      .split(" ");
    const processedDate = `${dateTemp[1]} ${dateTemp[0]}, ${dateTemp[2]}`;
    console.log(processedDate);

    formData = { date: processedDate, ...formData };
    formData.description = formData.description.split(".");
    console.log(formData);
    props.setFormData(formData);
    reset();
    props.closeHandler();
  };

  return (
    <CardModal
      title="Add a new Card"
      openHandler={props.openHandler}
      closeHandler={props.closeHandler}
      isOpen={props.isOpen}
    >
      <div className="mt-0">
        <p className="text-left text-slate-500 mb-6 text-base">
          {props.type === "adding"
            ? "You are adding a new Card to "
            : "You are editing a Card from "}
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {props.title}{" "}
          </span>
          section of{" "}
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {props.taskName}.
          </span>
        </p>
        {/* -- form-box -- */}
        <form className="w-full" onSubmit={handleSubmit(onFormSubmitHandler)}>
          <p className="text-left text-slate-400 mb-4 text-sm">
            Set Priority for the Card
          </p>

          <div className="flex mb-12 items-center justify-between gap-4">
            <button
              type="button"
              className={`uppercase font-semibold text-normal tracking-widest md:tracking-[4px] text-slate-600  shadow-sm hover:bg-cyan-400 md:px-6 md:py-2 w-32 h-10 rounded-full transition-colors duration-300 ease-out text-center border-2 border-cyan-400 ${
                priority === "low" && priorityColorCode[priority]
              }`}
              onClick={() => priorityHandler("low")}
            >
              Low
            </button>
            <button
              type="button"
              className={`uppercase font-semibold text-normal tracking-widest md:tracking-[4px] text-slate-600  shadow-sm hover:bg-yellow-400 md:px-6 md:py-2 w-32 h-10 rounded-full transition-colors duration-300 ease-out text-center border-2 border-yellow-400 ${
                priority === "medium" && priorityColorCode[priority]
              }`}
              onClick={() => priorityHandler("medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={`uppercase font-semibold text-normal tracking-widest md:tracking-[4px] text-slate-600 hover:text-white  shadow-sm hover:bg-red-600 md:px-6 md:py-2 w-32 h-10 rounded-full transition-colors duration-300 ease-out text-center border-2 border-red-600 ${
                priority === "high" && priorityColorCode[priority]
              }`}
              onClick={() => priorityHandler("high")}
            >
              High
            </button>
          </div>

          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="w-52 border-t-2 border-slate-300"></div>
            <p className="text-center text-slate-400">Details</p>
            <div className="w-52 border-t-2 border-slate-300"></div>
          </div>

          {/* -- inputs -- */}
          <div className="mb-6">
            <label
              htmlFor="cardTitle"
              className="block mb-1 font-semibold text-slate-500"
            >
              Card Title
            </label>
            <input
              // value={cardData && cardData.title}
              value={cardTitle ? cardTitle : cardData && cardData.title}
              type="text"
              className="shadow-md bg-[#f2f2ff] border-t-2 border-l-2 border-white block text-slate-600 w-full px-5 py-2 rounded-full myinput font-poppins placeholder:text-sm"
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
              className="block mb-1 font-semibold  text-slate-500"
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
              className="shadow-md bg-[#f2f2ff] border-t-2 border-l-2 border-white block text-slate-600 w-full px-6 py-4 rounded-3xl mb-2 myinput font-poppins placeholder:text-sm"
              placeholder="describe the task for the card"
              id="cardDescription"
              {...register("description", { required: true, maxLength: 200 })}
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
                  Description cannot be more than 200 characters
                </span>
              )}
            </div>
          </div>
          <div className="mb-8 flex items-start justify-between">
            <div>
              <label
                htmlFor="cardDate"
                className="block mb-1 font-semibold  text-slate-500"
              >
                Date
              </label>
              <input
                type="date"
                value={date ? date : cardData && cardData.date}
                className="text-slate-400 shadow-inset rounded-full px-5 py-1 font-poppins text-base w-full md:w-48"
                id="cardDate"
                {...register("unprocessedDate", { required: true })}
                onChange={dateOnChangeHandler}
              />
              {/* error message */}
              <div>
                {errors.Date?.type === "required" && (
                  <span className="text-xs text-red-500">Date is required</span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="cardSection"
                className="block mb-1 font-semibold  text-slate-500"
              >
                Section
              </label>
              <select
                value={
                  cardSection ? cardSection : cardData && cardData.cardSection
                }
                className="text-slate-500 bg-[#f2f2ff] shadow-md border-t-2 border-l-2 border-white rounded-full px-5 py-1 font-poppins text-base tracking-widest uppercase font-semibold w-full md:w-48"
                {...register("section")}
                onChange={cardSectOnChangeHandler}
              >
                <option value="Backlog">backlog</option>
                <option value="Todo">todo</option>
                <option value="In Progress">in progress</option>
                <option value="Done">done</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-full p-2 text-white text-center font-semibold bg-blue-500 shadow-lg hover:bg-blue-600  transition-colors duration-300"
          >
            {props.type === "editing" ? "Update Card" : "Create Card"}
          </button>
        </form>
      </div>
    </CardModal>
  );
}

export default CardForm;
