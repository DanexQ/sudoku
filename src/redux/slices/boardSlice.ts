import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { PrevValue, undoMove } from "./moveHistorySlice";
import { Move } from "./types";

export type NewMove = Omit<Move, "prevValue">;

type Difficulty = "Easy" | "Medium" | "Hard" | null;
export type Cell = number | null;

type Board = {
  value: Cell[][];
  solution: Cell[][];
  difficulty: Difficulty;
};

type BoardFetch = {
  newboard: {
    grids: Board[];
    message: string | null;
  };
};

type InitialState = {
  data: Board;
  initialBoard: Cell[][];
  isSolved: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: InitialState = {
  data: {
    value: [[]],
    solution: [[]],
    difficulty: null,
  },
  initialBoard: [[]],
  isSolved: false,
  status: "idle",
  error: null,
};

export const board = createSlice({
  name: "board",
  initialState,
  reducers: {
    changeCellValue: (state, action: PayloadAction<Move>) => {
      const { x, y, value } = action.payload as NewMove;
      state.data.value[y][x] = value;
    },
    checkBoard: (state) => {
      const checkedBoard = state.data.value.map((row, y) =>
        row.map((_, x) => state.data.solution[y][x] === state.data.value[y][x])
      );

      state.isSolved = !checkedBoard.flat().includes(false);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.status = "loading";
        state.isSolved = false;
      })
      .addCase(
        fetchBoard.fulfilled,
        (state, action: PayloadAction<unknown>) => {
          const payload = action.payload as BoardFetch;
          state.status = "succeeded";
          const initialBoard = payload.newboard.grids[0].value.map((row) =>
            row.map((value) => (value === 0 ? null : value))
          );
          state.data = payload.newboard.grids[0];
          // fast finish for tests
          // state.data.difficulty = payload.newboard.grids[0].difficulty;
          // state.data.solution = payload.newboard.grids[0].solution;
          // state.data.value = payload.newboard.grids[0].solution;
          state.initialBoard = initialBoard;
        }
      )
      .addCase(fetchBoard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(undoMove, (state, action: PayloadAction<PrevValue>) => {
        const { x, y, prevValue: value } = action.payload;
        state.data.value[y][x] = value;
      });
  },
});

export const selectBoardData = (state: RootState) => state.board;

export const fetchBoard = createAsyncThunk("board/fetchBoard", async () => {
  const response = await axios.get("https://sudoku-api.vercel.app/api/dosuku");
  const board = response.data;
  return board;
});

export const { changeCellValue, checkBoard } = board.actions;

export default board.reducer;
