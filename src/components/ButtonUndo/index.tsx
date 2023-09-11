import { useAppSelector } from "../../hooks/useAppSelector";
import { getPrevValue, undoMove } from "../../redux/slices/moveHistorySlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Button from "../Button";

const UndoButton = () => {
  const prevValue = useAppSelector(getPrevValue);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    prevValue && dispatch(undoMove(prevValue));
  };

  return (
    <Button
      className="button--undo"
      handleClick={handleClick}
      disabled={!prevValue}
    >
      Undo
    </Button>
  );
};

export default UndoButton;
