import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskType: null,
  taskId: null,
};

const currentOptionSlice = createSlice({
  name: "currentOption",
  initialState: initialState,
  reducers: {
    setCurrentOption(state, action) {
      state.taskType = action.payload.taskType;
      state.taskId = action.payload.taskId;
    },
  },
});

export const currentOptionActions = currentOptionSlice.actions;
export default currentOptionSlice.reducer;
