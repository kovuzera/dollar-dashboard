import * as React from "react";

export interface ButtonProps {
  title: string;
  onClick?: Function;
}

const Button: React.SFC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button onClick={() => onClick}>
      <span>{title}</span>
    </button>
  );
};

export default Button;
