import * as React from "react";

import "./style.css";

export interface ButtonProps {
  title: string;
  onClick?: Function;
  icon?: string;
  disabled?: boolean;
  className?: string;
}

const Button: React.SFC<ButtonProps> = ({
  title,
  onClick,
  icon,
  disabled,
  className,
}) => {
  return (
    <button
      onClick={() => onClick}
      disabled={disabled}
      className={className ? className : ""}
    >
      <img src={icon}></img>
      <span>{title}</span>
    </button>
  );
};

export default Button;
