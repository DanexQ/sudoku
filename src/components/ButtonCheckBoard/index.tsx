import React from "react";
import Button from "../Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { checkBoard } from "../../redux/slices/boardSlice";

const ButtonCheckBoard = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(checkBoard());
  };
  return (
    <Button className="button--check-board" handleClick={handleClick}>
      Submit
    </Button>
  );
};

export default ButtonCheckBoard;
