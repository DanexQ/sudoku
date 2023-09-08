import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice";
import moveHistoryReducer from "./slices/moveHistorySlice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    moveHistory: moveHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
