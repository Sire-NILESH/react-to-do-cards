// import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentOptionActions } from "../store/current-option-slice";
// import { allData } from "./dummyData";
import { useState } from "react";
import { HiOutlineMenuAlt2, HiArrowNarrowLeft } from "react-icons/hi";

function SideNav(props) {
  const [showNavMobile, setShowNavMobile] = useState(null);
  const dispatch = useDispatch();

  const currOption = useSelector((state) => state.currentOption);
  const { designTeamTasks, personalTasks } = useSelector(
    (state) => state.allTasks
  );

  const selectCurrentOptionFromDesignTeam = (e) => {
    dispatch(
      currentOptionActions.setCurrentOption({
        taskType: "designTeamTasks",
        taskId: e.target.id,
      })
    );
  };

  const selectCurrentOptionFromPersonal = (e) => {
    dispatch(
      currentOptionActions.setCurrentOption({
        taskType: "personalTasks",
        taskId: e.target.id,
      })
    );
  };

  const showMobileNaveHandler = () => {
    setShowNavMobile((prevState) =>
      prevState && prevState === "show" ? "hide" : "show"
    );
  };

  // h-[50rem] h-[85vh]
  return (
    <>
      {/* mobile bav button */}
      <button
        className="absolute top-2 left-1 z-[50] rounded-full p-1 shadow-xl md:hidden"
        onClick={showMobileNaveHandler}
      >
        {showNavMobile === "show" ? (
          <HiArrowNarrowLeft className="h-7 w-7 text-slate-500 dark:text-slate-400" />
        ) : (
          <HiOutlineMenuAlt2 className="h-7 w-7 text-slate-500 dark:text-slate-400" />
        )}
      </button>
      {/* gray area */}
      <div
        className={`absolute ${
          showNavMobile && showNavMobile === "show" ? "block" : "hidden"
        } z-30 h-screen w-screen translate-y-[-15%] transform`}
        onClick={showMobileNaveHandler}
      ></div>
      <aside
        className={`absolute z-40 h-screen w-[60%] translate-y-[-16%]  transform bg-[#f2f2ff] ${
          showNavMobile && showNavMobile === "show"
            ? "translate-x-[0%]"
            : "translate-x-[-105%]"
        } easing-in-out shadow-lg  transition-all duration-300 dark:bg-stone-800 md:relative md:inline-block md:h-full md:w-[25%] md:translate-x-[0%] md:translate-y-[0%] md:!bg-transparent md:shadow-none`}
      >
        {/* <!-- 01 --> */}
        <div className="mb-8 mt-32 space-y-4 md:mt-[0.75rem]">
          <h3 className="text-normal col-span-1 ml-8 font-semibold text-slate-400/60 dark:text-slate-300 lg:text-2xl">
            Design team
          </h3>
          <ul className="space-y-2 lg:w-[85%]">
            {designTeamTasks?.map((task, i) => {
              return (
                <li key={i}>
                  <button
                    className={`relative w-full rounded-r-full px-8 py-2 text-left text-sm font-semibold text-slate-500 transition-colors duration-200 ease-out hover:bg-purple-200/50 focus:!outline-0 dark:hover:bg-gray-800  ${
                      currOption.taskId === task.taskId
                        ? "current-option dark:bg-lime-400 dark:text-slate-600 dark:shadow-none dark:hover:!bg-lime-400 dark:hover:!text-slate-600"
                        : ""
                    }`}
                    key={i}
                    id={task.taskId}
                    onClick={selectCurrentOptionFromDesignTeam}
                  >
                    {task && task.task}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {/* -- 02 -- */}
        <div className="mb-8 space-y-4">
          <h3 className="text-normal col-span-1 ml-8 font-semibold text-slate-400/50 dark:text-slate-300  lg:text-2xl">
            Personal
          </h3>
          <>
            <ul className="space-y-2 lg:w-[80%]">
              {personalTasks?.map((task, i) => {
                return (
                  <li key={i}>
                    <button
                      className={`relative w-full rounded-r-full px-8 py-2 text-left text-sm font-semibold text-slate-500 transition-colors duration-200 ease-out hover:bg-purple-200/50 focus:!outline-0 dark:hover:bg-gray-800 ${
                        currOption.taskId === task.taskId
                          ? "current-option dark:bg-lime-400 dark:text-slate-600 dark:shadow-none dark:hover:!bg-lime-400 dark:hover:!text-slate-600"
                          : ""
                      }`}
                      key={task.taskId}
                      id={task.taskId}
                      onClick={selectCurrentOptionFromPersonal}
                    >
                      {task.task}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        </div>
      </aside>
    </>
  );
}

export default SideNav;
