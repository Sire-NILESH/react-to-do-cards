import React from "react";
import AddNewCard from "./AddNewCard";
import Card from "./Card";

function CardColumn(props) {
  return (
    //  {/* -- COL-1 -- */}
    <div>
      <div className="flex flex-col gap-6">
        <p className="uppercase tracking-[4px] font-bold text-normal text-slate-500">
          {props.title}
        </p>

        {/*  card container col  */}
        {/* cards */}
        <div className="flex flex-col gap-6 ml-3">
          {props.cards.map((card) => (
            <div key={card.cardId}>
              <Card card={card} taskName={props.taskName} title={props.title} />
            </div>
          ))}

          {/* add new cards  */}
          <AddNewCard taskName={props.taskName} title={props.title} />
        </div>
      </div>
    </div>
  );
}

export default CardColumn;
