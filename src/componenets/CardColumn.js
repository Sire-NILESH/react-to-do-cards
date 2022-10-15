import React from "react";
import AddNewCard from "./AddNewCard";
import Card from "./Card";

function CardColumn(props) {
  const categoryMapper = {
    backLog: "backLogCards",
    todo: "todoCards",
    "in progress": "inProgressCards",
    done: "doneCards",
  };

  return (
    //  {/* -- COL-1 -- */}
    <div>
      <div className="flex flex-col gap-6">
        <p className="text-normal font-bold uppercase tracking-[4px] text-slate-500">
          {props && props.title}
        </p>

        {/*  card container col  */}
        {/* cards */}
        <div className="ml-3 flex flex-col gap-6">
          {props.cards.map((card) => (
            <div key={props && card.cardId}>
              <Card
                card={card}
                cardCategory={categoryMapper[props.title]}
                taskName={props && props.taskName}
                title={props.title}
              />
            </div>
          ))}

          {/* add new cards  */}
          <AddNewCard
            taskName={props && props.taskName}
            title={props.title}
            cardCategory={categoryMapper[props.title]}
          />
        </div>
      </div>
    </div>
  );
}

export default CardColumn;
