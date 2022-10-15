import React from "react";
import { RiLoader3Line } from "react-icons/ri";

function Loader(props) {
  return (
    <div>
      <div className="flex items-center justify-center gap-4 capitalize tracking-widest ">
        <RiLoader3Line className="animate-spin text-5xl text-blue-500" />
        <p className="text-2xl font-semibold text-slate-500">
          {props.title}...
        </p>
      </div>
    </div>
  );
}

export default Loader;
