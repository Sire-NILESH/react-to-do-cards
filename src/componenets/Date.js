import React from "react";

function Date(props) {
  return (
    <div>
      {props.size === "md" ? (
        <span className="shadow-inset w-24 rounded-full p-1 text-center text-xs text-slate-400 dark:border-2 dark:border-stone-800 dark:bg-stone-900 dark:!shadow-none">
          {props.date}
        </span>
      ) : (
        <span className="shadow-inset  text-normal h-10 rounded-full px-4 py-2 text-center text-slate-500 dark:border-stone-800 dark:bg-stone-900 dark:!shadow-none sm:!w-28  md:px-6">
          {props.date}
        </span>
      )}
    </div>
  );
}

export default Date;
