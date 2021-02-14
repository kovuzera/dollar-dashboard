import React from "react";

function WarningText({ text }: { text: string }) {
  return (
    <div style={{ color: "red", fontSize: 12, padding: "3px" }}>{text}</div>
  );
}

export default WarningText;
