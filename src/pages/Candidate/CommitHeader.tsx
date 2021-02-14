import React from "react";

//Components
import NumberBlock from "../../components/NumberBlock";

type CommitHeaderProps = {
  epoch: number;
  startEpoch: number;
  periodEpoch: number;
};

const CommitHeader = ({
  epoch,
  startEpoch,
  periodEpoch,
}: CommitHeaderProps) => (
  <div>
    <div>
      <NumberBlock title="Epoch" num={epoch} />
    </div>
    <div>
      <NumberBlock title="Starts" num={startEpoch} />
    </div>
    <div>
      <NumberBlock title="Period" num={periodEpoch} />
    </div>
  </div>
);

export default CommitHeader;
