import { createSlice } from "@reduxjs/toolkit";

const membersSlice = createSlice({
  name: "members",
  initialState: {
    // allMembers: [
    //   {
    //     userId: null,
    //     userName: null,
    //     photoId: null,
    //     userEmail: null,
    //     role: null,
    //   },
    // ],
    // currentTaskMembers: [
    //   {
    //     userId: null,
    //     userName: null,
    //     photoId: null,
    //     userEmail: null,
    //     role: null,
    //   },
    // ],
    allMembers: {},
    currentTaskMembers: [],
  },
  reducers: {
    setAllMembers(state, action) {
      // state.allMembers = [...action.payload];
      action.payload.map((m) => {
        return (state.allMembers[m.userId] = m);
      });
    },

    setCurrentTaskMembers(state, action) {
      // state.currentTaskMembers = [...action.payload];
      const taskMembers = action.payload.map((m) => state.allMembers[m.userId]);
      state.currentTaskMembers = [...taskMembers];
    },

    //  removeMembers(state, action) {
    //    const { memberList } = action.payload;
    //    state.findIndex((m) => m.userId === userId);
    //  },
  },
});

export const membersActions = membersSlice.actions;
export default membersSlice.reducer;
