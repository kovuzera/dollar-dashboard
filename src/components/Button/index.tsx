import * as React from "react";

export interface ButtonProps {
  title: string;
  onClick?: Function;
  icon?: string;
  disabled?: boolean;
}

const Button: React.SFC<ButtonProps> = ({ title, onClick, icon, disabled }) => {
  return (
    <button onClick={() => onClick} disabled={disabled}>
      <img src={icon}></img>
      <span>{title}</span>
    </button>
  );
};

export default Button;
