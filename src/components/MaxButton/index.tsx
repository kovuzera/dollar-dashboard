import React from "react";

export interface MaxButtonProps {
  onClick: Function;
}

const MaxButton: React.SFC<MaxButtonProps> = ({ onClick }) => {
  return (
    <div style={{ padding: 3 }}>
      <button onClick={() => onClick}>
        <span style={{ opacity: 0.5 }}> Max </span>
      </button>
    </div>
  );
};

export default MaxButton;
