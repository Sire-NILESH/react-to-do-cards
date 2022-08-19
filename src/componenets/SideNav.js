// import React, { useState } from "react";

function SideNav(props) {
  // const [currentOption, setCurrrentOption] = useState(
  //   props.designTeamTasks[0].taskId
  // );

  const selectCurrentOptionFromDesignTeam = (e) => {
    // setCurrrentOption(e.target.id);
    props.setCurrentOption({ parent: "designTeamTasks", task: e.target.id });
  };

  const selectCurrentOptionFromPersonal = (e) => {
    // setCurrrentOption(e.target.id);
    props.setCurrentOption({ parent: "personalTasks", task: e.target.id });
  };

  return (
    <aside className="hidden md:inline-block w-1/4 h-full overflow-auto">
      {/* <!-- 01 --> */}
      <div className="space-y-4 mb-8 mt-[0.75rem] ">
        <h3 className="col-span-1 text-normal lg:text-2xl font-semibold text-slate-300 ml-8">
          Design team
        </h3>
        <ul className="space-y-2 lg:w-4/5">
          {props.designTeamTasks &&
            props.designTeamTasks.map((task) => {
              return (
                <li>
                  <button
                    className={`relative font-semibold w-full text-left text-slate-500 text-sm hover:bg-gray-200 px-8 py-2 rounded-r-full transition-colors duration-200 ease-out focus:!outline-0  ${
                      props.currentOption.task === task.taskId
                        ? "current-option"
                        : ""
                    }`}
                    key={task.taskId}
                    id={task.taskId}
                    onClick={selectCurrentOptionFromDesignTeam}
                  >
                    {task.task}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      {/* -- 02 -- */}
      <div className="space-y-4 mb-8">
        <h3 className="col-span-1 text-normal lg:text-2xl font-semibold text-slate-300 ml-8">
          Personal
        </h3>
        <ul className="space-y-2 lg:w-4/5">
          {props.personalTasks &&
            props.personalTasks.map((task) => {
              return (
                <li>
                  <button
                    className={`relative font-semibold w-full text-left text-slate-500 text-sm hover:bg-gray-200 px-8 py-2 rounded-r-full transition-colors duration-200 ease-out focus:!outline-0 ${
                      props.currentOption.task === task.taskId
                        ? "current-option"
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
      </div>
    </aside>
  );
}

export default SideNav;
