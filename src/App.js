import "./App.css";
import Header from "./componenets/Header";
import SideNav from "./componenets/SideNav";
import Board from "./componenets/Board";
import { users, allData } from "./componenets/dummyData";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUserActions } from "./store/current-user-slice";
import { allTasksActions } from "./store/all-tasks-slice";
import { currentOptionActions } from "./store/current-option-slice";
import { membersActions } from "./store/members-slice";
// import { designTeamTasksSliceActions } from "./store/design-team-tasks-slice";
import Loader from "./componenets/Loader";

function App() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(null);
  const [isSpinner, setIsSpinner] = useState(false);

  let userTemp = allData[0].user;

  useEffect(() => {
    // SET THEME
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    // SET USER
    dispatch(
      currentUserActions.setCurrentUser({
        ...userTemp,
      })
    );

    // SET CURRENT OPTION
    dispatch(
      currentOptionActions.setCurrentOption({
        taskType: "designTeamTasks",
        taskId: allData[0].designTeamTasks[0].taskId,
      })
    );

    // SET ALL TASKS
    dispatch(
      allTasksActions.setInitialTasks({
        designTeamTasks: allData[0].designTeamTasks,
        personalTasks: allData[0].personalTasks,
      })
    );

    // SET ALL MEMBERS
    dispatch(membersActions.setAllMembers(users));
  }, [dispatch, userTemp]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // const currOption = useSelector((state) => state.currentOption);
  // const taskForBoard = useSelector((state) =>
  //   state.allTasks[`${currOption?.taskType}`]?.find((task) => {
  //     return task.taskId === currOption.taskId;
  //   })
  // );

  const themeHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    // setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
  };

  const toggleSpinner = () => {
    setIsSpinner((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-[#f2f2ff] font-poppins text-slate-700 dark:bg-stone-800 ">
        {/* LOADER SPINNER */}
        {isSpinner && (
          <div className="absolute z-50 mx-auto flex h-screen w-screen items-center justify-center bg-gray-100/10 backdrop-blur-md">
            <Loader title="updating" />
          </div>
        )}

        {/* container */}
        <div className="shadow-outset flex h-full  w-full flex-col space-y-4 py-8 dark:bg-stone-900 dark:!shadow-2xl md:h-[90%]  md:w-[90vw] md:rounded-3xl xl:w-[85vw]">
          <Header
            team={allData[0].team}
            allUsers={users}
            themeHandler={themeHandler}
            currentTheme={theme}
          />
          {/* main content */}
          <main className="flex h-full w-full gap-12 overflow-hidden pb-12 md:gap-8">
            <SideNav />
            <Board />
            {/* <Board taskForBoard={taskForBoard} /> */}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
