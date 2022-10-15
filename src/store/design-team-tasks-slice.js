// import { createSlice } from "@reduxjs/toolkit";
// import randomIdGen from "../utils/randomIdGen";

// const initialState = { designTeamTasks: [] };
// // card, taskId, category
// const designTeamTasksSlice = createSlice({
//   name: "allTasks",
//   initialState: initialState,
//   reducers: {
//     // APPEND NEW CARD
//     // action = {taskId, taskType, category:backLogCards/todoCards.., card: {} }
//     addCardDT(state, action) {
//       const i = state.taskType.findIndex(
//         (t) => t.taskId === action.payload.taskId
//       );
//       action.payload.card.cardId = randomIdGen();
//       state.taskType[i][`${action.payload.category}`].push(action.payload.card);
//     },

//     // UPDATE A CARD
//     // action = {taskId, category:backLogCards/todoCards.., cardUpdates: {} }
//     updateCardDT(state, action) {
//       const i = state.findIndex((t) => t.taskId === action.payload.taskId);
//       const cardIndex = state[i][`${action.payload.category}`].findIndex(
//         (c) => c.cardId === action.payload.cardId
//       );
//       const cardUpdates = action.payload.cardUpdates;
//       state[i][`${action.payload.category}`][cardIndex] = {
//         ...state[i][`${action.payload.category}`][cardIndex],
//         ...cardUpdates,
//       };
//     },

//     // SET INITIAL TASKS
//     // action = {designTeamTasks[], personalTasks[]}
//     setInitialTasksDT(state, action) {
//       state.designTeamTasks = action.payload.designTeamTasks;
//     },

//     // ADD NEW TASK
//     // action = {taskType: designTeamTasks/personalTasks, title}
//     addTaskDT(state, action) {
//       const { taskType, title } = action.payload;
//       state[`${taskType}`].push({
//         taskId: randomIdGen(),
//         task: title,
//         backLogCards: [],
//         todoCards: [],
//         inProgressCards: [],
//         doneCards: [],
//       });
//     },

//     // UPDATE TASK
//     // const action = {
//     //   taskId,
//     //   taskType,
//     //   update: {
//     //     taskType?: personalTasks / designTeamTasks,
//     //     title
//     //   }
//     // }
//     updateTaskDT(state, action) {
//       const { taskType, taskId } = action.payload.currentOption;

//       state[`${taskType}`].find((t) => t.taskId === taskId).task =
//         action.payload.update.title;

//       if (action.payload.update.taskType) {
//         const taskIndex = state[`${taskType}`].findIndex(
//           (t) => t.taskId === taskId
//         );
//         const moveTask = state[`${taskType}`].splice(taskIndex, 1);
//         state[`${action.payload.update.taskType}`].push(moveTask);
//       }
//     },
//   },
// });

// export const designTeamTasksSliceActions = designTeamTasksSlice.actions;
// export default designTeamTasksSlice.reducer;
