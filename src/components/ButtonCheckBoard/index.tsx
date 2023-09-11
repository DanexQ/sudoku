import Button from "../Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { checkBoard } from "../../redux/slices/boardSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

const ButtonCheckBoard = () => {
  const dispatch = useAppDispatch();
  const prevValue = useAppSelector((state) => state.moveHistory.prevValue);

  const handleClick = () => {
    dispatch(checkBoard());
  };
  return (
    <Button
      className="button--check-board"
      handleClick={handleClick}
      disabled={!prevValue}
    >
      Submit
    </Button>
  );
};

export default ButtonCheckBoard;
