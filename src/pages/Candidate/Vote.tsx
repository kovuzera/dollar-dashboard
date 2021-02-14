import React from "react";
import BigNumber from "bignumber.js";
import { recordVote } from "../../utils/web3";

import { ESDS } from "../../constants/tokens";

//Components
import Container from "../../components/Container";
import Button from "../../components/Button";
import TextBlock from "../../components/TextBlock";
import BalanceBlock from "../../components/BalanceBlock";

type VoteProps = {
  candidate: string;
  stake: BigNumber;
  vote: number;
  status: number;
};

const VOTE_TYPE_MAP = ["Undecided", "Approve", "Reject"];

function Vote({ candidate, stake, vote, status }: VoteProps) {
  return (
    <Container>
      <div style={{ display: "flex" }}>
        <div style={{ width: "20%" }}>
          <BalanceBlock asset="My Stake" balance={stake} suffix={"ESDS"} />
        </div>
        <div style={{ width: "20%" }}>
          <TextBlock label="My Vote" text={VOTE_TYPE_MAP[vote]} />
        </div>
        <div style={{ width: "18%", paddingTop: "2%" }}>
          <Button
            /*   wide
            icon={<IconRotateLeft />} */
            title="Unvote"
            onClick={() => {
              recordVote(ESDS.addr, candidate, 0);
            }}
            /* disabled={status === 1 || vote === 0 || stake.isZero()} */
          />
        </div>
        <div style={{ width: "3%" }} />
        <div style={{ width: "18%", paddingTop: "2%" }}>
          <Button
            /*  wide
            icon={<IconCircleCheck />} */
            title="Accept"
            onClick={() => {
              recordVote(ESDS.addr, candidate, 1);
            }}
            /*  disabled={status === 1 || vote === 1 || stake.isZero()} */
          />
        </div>

        <div style={{ width: "3%" }} />
        <div style={{ width: "18%", paddingTop: "2%" }}>
          <div style={{ display: "flex" }}>
            <Button
              /*  wide
              icon={<IconProhibited />} */
              title="Reject"
              onClick={() => {
                recordVote(ESDS.addr, candidate, 2);
              }}
              /*  disabled={status === 1 || vote === 2 || stake.isZero()} */
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Vote;
