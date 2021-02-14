import React from "react";

//Components
import NumberBlock from "../../components/NumberBlock";
import TextBlock from "../../components/TextBlock";

type AccountPageHeaderProps = {
  epoch: number;
  epochTime: number;
};

const EpochPageHeader = ({ epoch, epochTime }: AccountPageHeaderProps) => (
  <div>
    <div>
      <NumberBlock title="Current" num={epoch} />
    </div>
    <div>
      <NumberBlock title="Available" num={epochTime} />
    </div>
    <div>
      <TextBlock label="Period" text={epoch < 106 ? "24 hours" : "8 hours"} />
    </div>
  </div>
);

export default EpochPageHeader;
