import Cell from "../Cell";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  changeCellValue,
  selectBoardData,
} from "../../redux/slices/boardSlice";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Grid = () => {
  const [typingMode, setTypingMode] = useState({
    typing: false,
    coordinates: { x: 0, y: 0 },
  });
  const dispatch = useAppDispatch();
  const boardInitialized = useAppSelector((state) => state.board.initialBoard);
  const boardData = useAppSelector(selectBoardData);

  const keyPressEvent = useCallback(
    (event: KeyboardEvent) => {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const pressedKey = event.key;
      if (!numbers.includes(+pressedKey)) {
        return;
      }
      const { x, y } = typingMode.coordinates;
      dispatch(changeCellValue({ x, y, value: pressedKey }));
      setTypingMode((prev) => ({ ...prev, typing: false }));
      handleRemoveListener();
    },
    [dispatch, typingMode.coordinates]
  );

  const handleRemoveListener = useCallback(() => {
    return window.removeEventListener("keypress", keyPressEvent);
  }, [keyPressEvent]);

  const handleClick = (coordinates: { x: number; y: number }) => {
    setTypingMode({ typing: true, coordinates });
  };

  useEffect(() => {
    if (typingMode.typing) window.addEventListener("keypress", keyPressEvent);

    return () => {
      handleRemoveListener();
    };
  }, [handleRemoveListener, keyPressEvent, typingMode.typing]);

  return (
    <div>
      {boardData.data.value.map((row, y) => (
        <div className="flex" key={y}>
          {row.map((value, x) => (
            <Cell
              key={x}
              value={value}
              handleClick={() => handleClick({ x, y })}
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
