import * as React from "react";

import "./style.css";

export interface ButtonProps {
  title: string;
  onClick?: Function;
  icon?: string;
  disabled?: boolean;
  flexBasis?: number;
}

const Button: React.SFC<ButtonProps> = ({
  title,
  onClick,
  icon,
  disabled,
  flexBasis,
}) => {
  return (
    <button onClick={() => onClick} disabled={disabled}>
      <img src={icon}></img>
      <span>{title}</span>
    </button>
  );
};

export default Button;
