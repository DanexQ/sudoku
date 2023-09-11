import { useRef } from "react";
import "./cell.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Cell as CellType } from "../../redux/slices/boardSlice";
type CellProps = {
  value: number | null;
  handleClick: (prevValue: CellType) => void;
  handleRemoveListener: () => void;
  disabled: boolean;
};

const Cell = ({
  value,
  handleClick,
  handleRemoveListener,
  disabled,
}: CellProps) => {
  const isSolved = useAppSelector((state) => state.board.isSolved);
  const ref = useRef<HTMLInputElement>(null);
  const disabledStyle = disabled ? "cell--disabled" : "cell--enabled";
  const solvedStyle = isSolved ? "cell--solved" : "";

  return (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      value={value || ""}
      onChange={() => {
        ref?.current?.blur();
      }}
      className={`cell ${disabledStyle} ${solvedStyle}`}
      onClick={() => handleClick(value)}
      onBlur={() => handleRemoveListener()}
      disabled={disabled || isSolved}
    />
  );
};

export default Cell;
