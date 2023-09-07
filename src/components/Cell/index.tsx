import { MouseEventHandler, useRef } from "react";

type CellType = {
  value: string;
  handleClick: MouseEventHandler<HTMLDivElement>;
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
      className={`text-center w-12 h-12 border text-gray-200 text-lg font-bold border-gray-200 hover:cursor-pointer ${
        disabled
          ? "bg-neutral-700"
          : "bg-neutral-900 focus:bg-blue-600 focus:outline-none focus:border"
      }`}
      onClick={handleClick}
      onBlur={() => handleRemoveListener()}
      disabled={disabled}
    />
  );
};

export default Cell;
