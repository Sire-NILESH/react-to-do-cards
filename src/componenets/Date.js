import React from "react";

function Date(props) {
  return (
    <div>
      {props.size === "md" ? (
        <span className="shadow-inset p-1 text-slate-400 text-xs w-24 text-center rounded-full ">
          {props.date}
        </span>
      ) : (
        <span className="shadow-inset  md:w-36 h-10 text-slate-500 text-normal text-center rounded-full px-4 md:px-6 py-2 w-full sm:!w-28 ">
          {props.date}
        </span>
      )}
    </div>
  );
}

export default Date;
