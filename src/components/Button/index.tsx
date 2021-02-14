import * as React from "react";

export interface ButtonProps {
  title: string;
  onClick?: Function;
  icon?: string;
}

const Button: React.SFC<ButtonProps> = ({ title, onClick, icon }) => {
  return (
    <button onClick={() => onClick}>
      <img src={icon}></img>
      <span>{title}</span>
    </button>
  );
};

export default Button;
