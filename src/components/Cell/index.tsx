import { useRef } from "react";
import "./cell.scss";

type CellType = {
  value: string;
  handleClick: (prevValue: string) => void;
  handleRemoveListener: () => void;
  disabled: boolean;
};

const Cell = ({
  value,
  handleClick,
  handleRemoveListener,
  disabled,
}: CellType) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      value={value}
      onChange={() => {
        ref?.current?.blur();
      }}
      className={`cell ${disabled ? "cell--disabled" : "cell--enabled"}`}
      onClick={() => handleClick(value)}
      onBlur={() => handleRemoveListener()}
      disabled={disabled}
    />
  );
};

export default Cell;
