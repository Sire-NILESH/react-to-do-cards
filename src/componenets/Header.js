import React, { useState } from "react";
import Members from "./Members";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const showTeamMembersHandler = () => {
    setShow("team");
    setIsOpen(true);
  };

  const showAllMembersHandler = () => {
    setShow("all");
    setIsOpen(true);
  };

  return (
    <header className="grid grid-cols-5 border-b-2 p-6 mx-8 items-center">
      <div className="flex items-center justify-start space-x-2 cursor-pointer">
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-slate-300 hover:text-slate-400 transition-colors duration-200 ease-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search"
          className="w-[100%] placeholder:uppercase text-sm tracking-widest lg:placeholder:tracking-[4px] font-semibold placeholder:text-slate-300 text-slate-600 p-2 bg-[#f2f2ff] focus:outline-none focus:border-b-2 focus:border-slate-400 hidden md:inline-block"
        />
      </div>
      {/* center */}
      <div className="flex col-span-3 justify-self-center items-center space-x-1">
        <p className="uppercase font-semibold text-sm text-slate-500 tracking-widest mr-4 lg:mr-8">
          Design Team
        </p>
        {/* member images */}
        <div className="hidden md:flex gap-1">
          <div
            className="hidden lg:flex lg:gap-1 cursor-pointer"
            onClick={showTeamMembersHandler}
          >
            {props.team.map((user) => {
              return (
                <img
                  key={user}
                  src={`users/${user.photoId}.jpg`}
                  className="border-2 rounded-full bg-slate-300 w-10 h-10"
                  alt={`${user.userName}`}
                />
              );
            })}
          </div>

          <div
            className="flex gap-1 lg:hidden cursor-pointer"
            onClick={showTeamMembersHandler}
          >
            <img
              src={`users/${props.team[0].photoId}.jpg`}
              className="border-2 rounded-full bg-slate-300 w-10 h-10"
              alt={`${props.team[0].userName}`}
            />
            <img
              src={`users/${props.team[1].photoId}.jpg`}
              className="border-2 rounded-full bg-slate-300 w-10 h-10"
              alt={`${props.team[1].userName}`}
            />
            <img
              src={`users/${props.team[2].photoId}.jpg`}
              className="border-2 rounded-full bg-slate-300 w-10 h-10"
              alt={`${props.team[2].userName}`}
            />
          </div>

          <button
            type="buttton"
            className="text-slate-500 w-8 h-8 shadow-btn rounded-full flex items-center justify-center"
            onClick={showAllMembersHandler}
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
          </button>

          {/* Team Members Modal */}
          {isOpen && (
            <Members
              openHandler={openModal}
              closeHandler={closeModal}
              isOpen={isOpen}
              show={show}
              allUsers={props.allUsers}
              team={props.team}
            />
          )}
        </div>
      </div>
      {/* <!-- last --> */}
      <div className="flex items-center justify-end space-x-4 lg:space-x-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-slate-300 hover:text-slate-400 transition-colors duration-200 ease-out cursor-pointer hidden md:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <img
          src={`users/${props.user.photoId}.jpg`}
          className="border-2 rounded-full bg-slate-300 w-10 h-10"
          alt={`${props.user.userName}`}
        />
      </div>
    </header>
  );
}

export default Header;
