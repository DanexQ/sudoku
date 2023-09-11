import { Cell } from "./boardSlice";

export type Move = {
  x: number;
  y: number;
  value: Cell;
  prevValue: Cell;
};
