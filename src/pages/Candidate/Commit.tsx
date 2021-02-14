import React from "react";

//Constants
import { ESDS } from "../../constants/tokens";

//Utils
import { commit } from "../../utils/web3";

//Components
import Container from "../../components/Container";
import Button from "../../components/Button";
import TextBlock from "../../components/TextBlock";

type CommitProps = {
  user: string;
  candidate: string;
  epoch: number;
  startEpoch: number;
  periodEpoch: number;
  initialized: boolean;
  approved: boolean;
};

function Commit({
  user,
  candidate,
  epoch,
  startEpoch,
  periodEpoch,
  initialized,
  approved,
}: CommitProps) {
  function status(
    epoch,
    startEpoch,
    periodEpoch,
    initialized,
    approved
  ): string {
    if (startEpoch === 0) {
      return "N/A";
    }
    if (epoch < startEpoch) {
      return "Unknown";
    }
    if (epoch < startEpoch + periodEpoch) {
      return "Voting";
    }
    if (initialized) {
      return "Committed";
    }
    if (approved) {
      return "Approved";
    }
    return "Rejected";
  }
  const s = status(epoch, startEpoch, periodEpoch, initialized, approved);

  return (
    <Container>
      <div>
        <div>
          <TextBlock label="Status" text={s} />
        </div>
        <div />

        <div>
          <div>
            <Button
              /*  wide
              icon={<IconUpload />} */
              title="Commit"
              onClick={() => {
                commit(ESDS.addr, candidate);
              }}
              disabled={user === "" || s !== "Approved"}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Commit;
