import React from "react";

type IconHeaderProps = {
  icon: any;
  text: string;
};

function IconHeader({ icon, text }: IconHeaderProps) {
  return (
    <>
      <div>
        <div>{icon}</div>
        <div>
          <p>text</p>
        </div>
      </div>
    </>
  );
}

export default IconHeader;
