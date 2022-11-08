import { createSlice } from "@reduxjs/toolkit";

const initialErrorObj = {
  isError: false,
  statusCode: "",
  message: "",
};

const globalErrorSlice = createSlice({
  name: "error",
  initialState: initialErrorObj,
  reducers: {
    setGlobalError(state, action) {
      console.log(action);
      state.isError = true;
      if (action.payload.statusCode) {
        state.statusCode = action.payload.statusCode;
      } else {
        state.statusCode = "";
      }

      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.message = "Something went wrong";
      }
    },

    resetGlobalError(state, action) {
      state.isError = false;
      state.statusCode = initialErrorObj.statusCode;
      state.message = initialErrorObj.message;
    },
  },
});

export const globalErrorActions = globalErrorSlice.actions;
export default globalErrorSlice.reducer;
