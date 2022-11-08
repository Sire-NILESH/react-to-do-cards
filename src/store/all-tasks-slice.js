import { createSlice } from "@reduxjs/toolkit";
import randomIdGen from "../utils/randomIdGen";

const initialState = { designTeamTasks: [], personalTasks: [] };
// card, taskId, category
const allTasksSlice = createSlice({
  name: "allTasks",
  initialState: initialState,
  reducers: {
    // SET INITIAL TASKS
    // action = {designTeamTasks[], personalTasks[]}
    setInitialTasks(state, action) {
      state["designTeamTasks"] = action.payload.designTeamTasks;
      state["personalTasks"] = action.payload.personalTasks;
    },

    // APPEND NEW CARD
    // action = {taskId, taskType, cardData: {category:backLogCards/todoCards..} }
    addCard(state, action) {
      const { taskType, taskId, cardData } = action.payload;
      action.payload.cardData.cardId = randomIdGen();
      state[`${taskType}`]
        .find((t) => t.taskId === taskId)
        [`${cardData.category}`].push(action.payload.cardData);
    },

    // UPDATE A CARD
    // action = {taskId, category:backLogCards/todoCards.., cardUpdates: {} }
    updateCard(state, action) {
      const { taskType, taskId, cardData } = action.payload;
      let temp = state[`${taskType}`].find((t) => t.taskId === taskId)[
        `${cardData.currentCategory}`
      ];
      const cardIndex = temp.findIndex((c) => c.cardId === cardData.cardId);

      const tempCard = temp[cardIndex];
      temp[cardIndex] = { ...tempCard, ...cardData.cardUpdates };
    },

    // MOVE CARD TO DONE
    moveCard(state, action) {
      const { taskType, taskId, cardData } = action.payload;

      const temp = state[`${taskType}`].find((t) => t.taskId === taskId);
      const cardIndex = temp[`${cardData.currentCategory}`].findIndex(
        (c) => c.cardId === cardData.cardId
      );
      const [cardTemp] = temp[`${cardData.currentCategory}`].splice(
        cardIndex,
        1
      );
      temp[cardData.targetCategory].push(cardTemp);
      // if (cardData.targetCategory === "doneCards") {
      //   temp[cardData.targetCategory].unshift(cardTemp);
      // } else {
      //   temp[cardData.targetCategory].push(cardTemp);
      // }
    },

    // DELETE CARD
    deleteCard(state, action) {
      const { taskType, taskId, cardData } = action.payload;
      const temp = state[`${taskType}`].find((t) => t.taskId === taskId);
      const cardIndex = temp[`${cardData.category}`].findIndex(
        (c) => c.cardId === cardData.cardId
      );
      temp[`${cardData.category}`].splice(cardIndex, 1);
    },

    // ADD NEW TASK
    // action = {taskType: designTeamTasks/personalTasks, title}
    addTask(state, action) {
      const { taskType, title } = action.payload;
      state[`${taskType}`].push({
        taskId: randomIdGen(),
        task: title,
        taskTeam: [],
        backLogCards: [],
        todoCards: [],
        inProgressCards: [],
        doneCards: [],
      });
    },

    // ADD A COMMENT
    // action = {cardId, userId, userName, photoId, comment, taskType}
    addComment(state, action) {
      const {
        cardId,
        userId,
        userName,
        photoId,
        comment,
        taskType,
        taskId,
        category,
      } = action.payload;

      const temp = state[taskType]
        .find((t) => t.taskId === taskId)
        [category].find((c) => c.cardId === cardId);
      const commentObj = {
        userId,
        photoId,
        userName,
        commentId: randomIdGen(),
        comment: comment.trim(),
      };

      if (temp.comments) {
        temp.comments.push(commentObj);
        temp.totalComments++;
      } else {
        temp.comments = [commentObj];
        temp.totalComments = 1;
      }
    },

    // ADD A PROGRESS
    addProgress(state, action) {
      const { taskId, taskType, update, cardId, category } = action.payload;

      const progressObj = { done: update.done, title: update.title.trim() };

      const temp = state[taskType]
        .find((t) => t.taskId === taskId)
        [category].find((c) => c.cardId === cardId);

      if (temp.overallProgress) {
        temp.overallProgress.push(progressObj);
      } else {
        temp.overallProgress = [progressObj];
      }
    },

    checkProgress(state, action) {
      const { taskId, taskType, update, cardId, category, index } =
        action.payload;

      const temp = state[taskType]
        .find((t) => t.taskId === taskId)
        [category].find((c) => c.cardId === cardId);

      const progressObj = { done: update.done, title: update.title };

      temp.overallProgress[index] = progressObj;
    },

    // UPDATE TASK
    // const action = {
    //   taskId,
    //   taskType,
    //   update: {
    //     taskType?: personalTasks / designTeamTasks,
    //     title
    //   }
    // }
    updateTask(state, action) {
      const { taskType, taskId } = action.payload;

      state[`${taskType}`].find((t) => t.taskId === taskId).task =
        action.payload.update.title;

      if (action.payload.update.taskType) {
        const taskIndex = state[`${taskType}`].findIndex(
          (t) => t.taskId === taskId
        );
        const [moveTask] = state[`${taskType}`].splice(taskIndex, 1);
        state[`${action.payload.update.taskType}`].push(moveTask);
      }
    },
  },
});

export const allTasksActions = allTasksSlice.actions;
export default allTasksSlice.reducer;
