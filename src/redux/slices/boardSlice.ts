import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Board = {
  value: string[][];
  solution: string[][];
};

type BoardFetch = {
  newboard: {
    grids: Board[];
    message: string | null;
  };
};

type InitialState = {
  data: Board;
  initialBoard: string[][];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: InitialState = {
  data: {
    value: [[]],
    solution: [[]],
  },
  initialBoard: [[]],
  status: "idle",
  error: null,
};

type ChangeCellValue = {
  x: number;
  y: number;
  value: string;
};

export const board = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    changeCellValue: (state, action: PayloadAction<ChangeCellValue>) => {
      const { x, y, value } = action.payload;
      state.data.value[y][x] = value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBoard.fulfilled,
        (state, action: PayloadAction<BoardFetch>) => {
          state.status = "succeeded";
          state.data = action.payload.newboard.grids[0];
          state.initialBoard = action.payload.newboard.grids[0].value;
        }
      )
      .addCase(fetchBoard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const selectBoardData = (state: RootState) => state.board;

export const fetchBoard = createAsyncThunk("board/fetchBoard", async () => {
  const response = await axios.get("https://sudoku-api.vercel.app/api/dosuku");
  const board = response.data;
  return board;
});

export const { changeCellValue } = board.actions;

export default board.reducer;
