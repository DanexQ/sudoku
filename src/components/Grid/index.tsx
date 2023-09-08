import Cell from "../Cell";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  changeCellValue,
  selectBoardData,
} from "../../redux/slices/boardSlice";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import "./grid.scss";

const Grid = () => {
  const [typingMode, setTypingMode] = useState({
    typing: false,
    coordinates: { x: 0, y: 0 },
    prevValue: "",
  });
  const dispatch = useAppDispatch();
  const boardInitialized = useAppSelector((state) => state.board.initialBoard);
  const boardData = useAppSelector(selectBoardData);

  const keyPressEvent = useCallback(
    (event: KeyboardEvent) => {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const value = event.key;
      if (!numbers.includes(+value)) {
        return;
      }
      const { x, y } = typingMode.coordinates;
      const { prevValue } = typingMode;
      dispatch(changeCellValue({ x, y, value, prevValue }));
      setTypingMode((prev) => ({ ...prev, typing: false }));
      handleRemoveListener();
    },
    [dispatch, typingMode.coordinates]
  );

  const handleRemoveListener = useCallback(() => {
    return window.removeEventListener("keypress", keyPressEvent);
  }, [keyPressEvent]);

  const handleClick = (coordinates: { x: number; y: number }) => {
    return (prevValue: string) =>
      setTypingMode({ typing: true, coordinates, prevValue });
  };

  useEffect(() => {
    if (typingMode.typing) window.addEventListener("keypress", keyPressEvent);

    return () => {
      handleRemoveListener();
    };
  }, [handleRemoveListener, keyPressEvent, typingMode.typing]);

  return (
    <div className="">
      {boardData.data.value.map((row, y) => (
        <div className="row" key={y}>
          {row.map((value, x) => (
            <Cell
              key={x}
              value={value}
              handleClick={handleClick({ x, y })}
              disabled={+boardInitialized[y][x] > 0}
              handleRemoveListener={handleRemoveListener}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
