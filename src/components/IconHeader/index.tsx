import React from "react";

type IconHeaderProps = {
  icon: any;
  text: string;
};

function IconHeader({ icon, text }: IconHeaderProps) {
  return (
    <>
      <div style={{ padding: "1%", display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "2%", fontSize: 48 }}>{icon}</div>
        <div>
          <p>text</p>
        </div>
      </div>
    </>
  );
}

export default IconHeader;
