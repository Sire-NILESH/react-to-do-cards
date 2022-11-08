import "./App.css";
import Header from "./componenets/Header";
import SideNav from "./componenets/SideNav";
import Board from "./componenets/Board";
// import { users, allData as allDataTemp } from "./componenets/dummyData";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserActions } from "./store/current-user-slice";
import { allTasksActions } from "./store/all-tasks-slice";
import { currentOptionActions } from "./store/current-option-slice";
import { membersActions } from "./store/members-slice";
// import { designTeamTasksSliceActions } from "./store/design-team-tasks-slice";
import Loader from "./componenets/Loader";
import ErrorPage from "./componenets/ErrorPage";
import ErrorModal from "./componenets/ErrorModal";

function App() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(null);
  const [isSpinner, setIsSpinner] = useState(false);
  const [users, setUsers] = useState(null);
  const [allData, setAllData] = useState(null);
  const [error, setError] = useState(false);
  const [isOpenGlobalErrorModal, setIsOpenGlobalErrorModal] = useState(false);

  // Error modal
  function closeGlobalErrorModalHandler() {
    setIsOpenGlobalErrorModal(false);
  }

  function openGlobalErrorModalHandler() {
    setIsOpenGlobalErrorModal(true);
  }

  useEffect(() => {
    setIsSpinner(true);
    const fetchRequest = async () => {
      const responseJson = await fetch("http://localhost:4000/api/all-data");
      const { users, allData } = await responseJson.json();

      setUsers(users);
      setAllData(allData);

      // SET USER
      dispatch(
        currentUserActions.setCurrentUser({
          ...allData[0].user,
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
      setIsSpinner(false);
    };

    // SET THEME
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    fetchRequest().catch(setError);
  }, [dispatch]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const themeHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const globalError = useSelector((state) => state.globalError);

  // if (globalError.isError) {
  //   openGlobalErrorModalHandler();
  //   console.log(globalError);
  // }

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-[#f2f2ff] font-poppins text-slate-700 dark:bg-stone-800 ">
        {/* LOADER SPINNER */}
        {isSpinner && (
          <div className="absolute z-50 mx-auto flex h-screen w-screen items-center justify-center bg-gray-100/10 backdrop-blur-md dark:bg-gray-900">
            {error ? (
              <div className="space-y-4 text-2xl font-bold text-slate-600">
                <ErrorPage />
              </div>
            ) : (
              <Loader title="loading" />
            )}
          </div>
        )}

        {/* container */}
        {allData && users && (
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
            </main>
          </div>
        )}
      </div>

      {/* Show Global Error Modal */}
      {(isOpenGlobalErrorModal || globalError.isError) && (
        <ErrorModal
          openHandler={openGlobalErrorModalHandler}
          closeHandler={closeGlobalErrorModalHandler}
          isOpen={isOpenGlobalErrorModal || globalError.isError}
          error={globalError}
        />
      )}
    </>
  );
}

export default App;
