import React from "react";
import "./button.scss";

type ButtonType = {
  className?: string;
  children: React.ReactNode;
  handleClick: () => void;
};

const Button = ({ className = "", children, handleClick }: ButtonType) => {
  return (
    <button className={`button ${className}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
