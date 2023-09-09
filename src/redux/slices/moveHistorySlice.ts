import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { changeCellValue } from "./boardSlice";
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
    undoMove: (state, action: PayloadAction<PrevValue>) => {
      console.log("undoMove", action.payload);
      state.allMoves = state.allMoves.slice(1);
      state.prevValue = state.allMoves[0];
    },
  },
  extraReducers(builder) {
    builder.addCase(
      changeCellValue,
      (state, action: PayloadAction<PrevValue>) => {
        state.prevValue = action.payload;
        state.allMoves = [action.payload, ...state.allMoves];
      }
    );
  },
});

export const { undoMove } = moveHistory.actions;

export const getPrevValue = (state: RootState) => state.moveHistory.prevValue;

export default moveHistory.reducer;
