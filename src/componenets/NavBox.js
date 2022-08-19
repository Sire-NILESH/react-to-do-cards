import React from "react";

function NavBox(props) {
  const navLinks = [];
  return (
    <div clssName="space-y-4 mb-8">
      <h3 clssName="col-span-1 text-normal lg:text-2xl font-semibold text-slate-300 ml-8">
        {props.title}
      </h3>

      <ul clssName="space-y-2 lg:w-4/5">
        {navLinks &&
          navLinks.map((navLink) => (
            <li clssName="relative font-semibold text-slate-500 text-sm hover:bg-gray-200 px-8 py-2 rounded-r-full transition-colors duration-200 ease-out current-option">
              <a href={`${navLink.href}`}>{navLink.title}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default NavBox;
