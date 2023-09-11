import React from "react";
import Button from "../Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchBoard } from "../../redux/slices/boardSlice";

const ButtonPlayAgain = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(fetchBoard());
  };

  return (
    <Button className="button--play-again" handleClick={handleClick}>
      Play again
    </Button>
  );
};

export default ButtonPlayAgain;
