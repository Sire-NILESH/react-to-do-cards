import { configureStore } from "@reduxjs/toolkit";
import currentOptionReducer from "./current-option-slice";
import allTasksReducer from "./all-tasks-slice";
import currentUserReducer from "./current-user-slice";
import membersSliceReducer from "./members-slice";
import globalErrorReducer from "./global-error-slice";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    allTasks: allTasksReducer,
    currentOption: currentOptionReducer,
    members: membersSliceReducer,
    globalError: globalErrorReducer,
  },
});

export default store;
