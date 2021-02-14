import React from "react";

export interface MaxButtonProps {
  onClick: Function;
}

const MaxButton: React.SFC<MaxButtonProps> = ({ onClick }) => {
  return (
    <div>
      <button onClick={() => onClick}>
        <span> Max </span>
      </button>
    </div>
  );
};

export default MaxButton;
