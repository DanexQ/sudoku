import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewMove, changeCellValue } from "./boardSlice";
import { RootState } from "../store";
import { Move } from "./types";

export type PrevValue = Omit<Move, "value">;

type InitialState = {
  prevValue: PrevValue | null;
  allMoves: PrevValue[];
};

const initialState: InitialState = {
  prevValue: null,
  allMoves: [],
};

const moveHistory = createSlice({
  name: "moveHistory",
  initialState,
  reducers: {
    undoMove: (state, action: PayloadAction<Move>) => {
      const { _, ...prevValue } = action.payload;
      state.allMoves = state.allMoves.slice(1);
      state.prevValue = prevValue;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      changeCellValue,
      (state, action: PayloadAction<NewMove>) => {
        console.log(state, action);
      }
    );
  },
});

export const { undoMove } = moveHistory.actions;

export const getPrevValue = (state: RootState) => state.moveHistory.prevValue;

export default moveHistory.reducer;
