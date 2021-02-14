import React from "react";

import BigNumber from "bignumber.js";

type NumberBlockProps = {
  title: string;
  num: BigNumber | string | number;
};

function NumberBlock({ title, num }: NumberBlockProps) {
  const numNum = new BigNumber(num).toNumber();

  return (
    <>
      <div>{title}</div>
      <div>{numNum}</div>
    </>
  );
}

export default NumberBlock;
