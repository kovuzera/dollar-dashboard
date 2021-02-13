import * as React from "react";

import "./index.css";

export interface RowProps {
  title: string;
  children: React.ReactNode;
}

const Row: React.SFC<RowProps> = ({ title, children }) => {
  return (
    <div className="Row">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Row;
