import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    userName: "",
    photoId: "",
    userEmail: "",
    role: "",
  },
  reducers: {
    setCurrentUser(state, action) {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.photoId = action.payload.photoId;
      state.userEmail = action.payload.userEmail;
      state.role = action.payload.role;
    },
  },
});

export const currentUserActions = currentUserSlice.actions;
export default currentUserSlice.reducer;
