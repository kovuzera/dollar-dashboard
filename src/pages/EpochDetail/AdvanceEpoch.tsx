import React from "react";

//Components
import Container from "../../components/Container";
import Button from "../../components/Button";
import NumberBlock from "../../components/NumberBlock";

//Utils
import { ESDS } from "../../constants//tokens";
import { advance } from "../../utils/web3";

type AdvanceEpochProps = {
  user: string;
  epoch: number;
  epochTime: number;
};

function AdvanceEpoch({ user, epoch, epochTime }: AdvanceEpochProps) {
  return (
    <Container>
      <div>
        <div>
          <NumberBlock title="Epoch (from current time)" num={epochTime} />
        </div>
        <div />
        <div>
          <Button
            /*  wide
            icon={<IconCirclePlus />} */
            title="Advance"
            onClick={() => {
              advance(ESDS.addr);
            }}
            disabled={user === "" || epoch >= epochTime}
          />
        </div>
      </div>
    </Container>
  );
}

export default AdvanceEpoch;
