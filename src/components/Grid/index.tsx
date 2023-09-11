import Cell from "../Cell";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  changeCellValue,
  selectBoardData,
} from "../../redux/slices/boardSlice";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import "./grid.scss";
import ButtonPlayAgain from "../ButtonPlayAgain";
import { Cell as CellType } from "../../redux/slices/boardSlice";

type PrevValueState = {
  typing: boolean;
  coords: { x: number; y: number };
  prevValue: CellType;
};

const Grid = () => {
  const [typingMode, setTypingMode] = useState<PrevValueState>({
    typing: false,
    coords: { x: 0, y: 0 },
    prevValue: 0,
  });
  const dispatch = useAppDispatch();
  const boardInitialized = useAppSelector((state) => state.board.initialBoard);
  const isSolved = useAppSelector((state) => state.board.isSolved);
  const boardData = useAppSelector(selectBoardData);

  const keyPressEvent = useCallback(
    (event: KeyboardEvent) => {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const value = +event.key;
      if (!numbers.includes(value)) {
        return;
      }
      const { x, y } = typingMode.coords;
      const { prevValue } = typingMode;
      dispatch(changeCellValue({ x, y, value, prevValue }));
      setTypingMode((prev) => ({ ...prev, typing: false }));
      handleRemoveListener();
    },
    [dispatch, typingMode.coords]
  );

  const handleRemoveListener = useCallback(() => {
    return window.removeEventListener("keypress", keyPressEvent);
  }, [keyPressEvent]);

  const handleClick = (coords: { x: number; y: number }) => {
    return (prevValue: number | null) =>
      setTypingMode({ typing: true, coords, prevValue });
  };

  useEffect(() => {
    if (typingMode.typing) window.addEventListener("keypress", keyPressEvent);

    return () => {
      handleRemoveListener();
    };
  }, [handleRemoveListener, keyPressEvent, typingMode.typing]);

  return (
    <div className="grid">
      {boardData.data.value.map((row, y) => (
        <div className="row" key={y}>
          {row.map((value, x) => (
            <Cell
              key={`${y}-${x}`}
              value={value}
              handleClick={handleClick({ x, y })}
              disabled={boardInitialized[y][x] !== null}
              handleRemoveListener={handleRemoveListener}
            />
          ))}
        </div>
      ))}
      {isSolved && (
        <div className="grid_absolute">
          <span className="grid_notification">Sudoku solved correctly!</span>
        </div>
      )}
    </div>
  );
};

export default Grid;
