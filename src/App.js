import "./App.css";
import Header from "./componenets/Header";
import SideNav from "./componenets/SideNav";
import Board from "./componenets/Board";
import { users, allData } from "./componenets/dummyData";
import { useState } from "react";

function App() {
  const [currentOption, setCurrentOption] = useState({
    parent: "designTeamTasks",
    task: allData[0].designTeamTasks[0].taskId,
  });

  const tasksForBoard = allData[0][`${currentOption.parent}`].filter((task) => {
    return task.taskId === currentOption.task;
  });

  return (
    <div className="font-poppins bg-[#f2f2ff] text-slate-700 h-screen w-screen flex justify-center items-center ">
      {/* container */}
      <div className="w-full h-full  md:w-[90vw] xl:w-[80vw] md:h-[90%] shadow-outset md:rounded-3xl py-8  space-y-4 flex flex-col">
        <Header
          team={allData[0].team}
          user={{ userName: allData[0].userName, photoId: allData[0].photoId }}
          userId={allData[0].id}
          allUsers={users}
        />
        {/* main content */}
        <main className="w-full h-full flex gap-12 lg:gap-14 pb-12 overflow-hidden">
          <SideNav
            designTeamTasks={allData[0].designTeamTasks}
            personalTasks={allData[0].personalTasks}
            currentOption={currentOption}
            setCurrentOption={setCurrentOption}
          />

          <Board
            tasksForBoard={tasksForBoard}
            currentCategory={currentOption.parent}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
