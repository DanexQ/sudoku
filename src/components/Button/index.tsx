import React from "react";
import "./button.scss";

type ButtonType = {
  className?: string;
  children: React.ReactNode;
  handleClick: () => void;
  disabled?: boolean;
};

const Button = ({
  className = "",
  children,
  handleClick,
  disabled,
}: ButtonType) => {
  return (
    <button
      className={`button ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
