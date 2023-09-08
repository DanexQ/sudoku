import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getLastMove, undoMove } from "../../redux/slices/moveHistorySlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Button from "../Button";

const UndoButton = () => {
  const lastMove = useAppSelector(getLastMove);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    lastMove && dispatch(undoMove(lastMove));
  };

  return lastMove ? (
    <Button className="button--undo" handleClick={handleClick}>
      Undo
    </Button>
  ) : null;
};

export default UndoButton;
