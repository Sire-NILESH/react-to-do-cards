import { configureStore } from "@reduxjs/toolkit";
import currentOptionReducer from "./current-option-slice";
import allTasksReducer from "./all-tasks-slice";
import currentUserReducer from "./current-user-slice";
import membersSliceReducer from "./members-slice";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    allTasks: allTasksReducer,
    currentOption: currentOptionReducer,
    members: membersSliceReducer,
  },
});

export default store;
