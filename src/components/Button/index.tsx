import * as React from "react";

export interface ButtonProps {
  title: string;
}

const Button: React.SFC<ButtonProps> = ({ title }) => {
  return (
    <button>
      <span>{title}</span>
    </button>
  );
};

export default Button;
