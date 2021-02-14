import React, { useState } from "react";

import BigNumber from "bignumber.js";
import { recordVote } from "../../utils/web3";

import { ESDS } from "../../constants/tokens";
import { canPropose } from "../../utils/gov";

//Components
import Container from "../../components/Container";
import Button from "../../components/Button";
import TextBlock from "../../components/TextBlock";
import BalanceBlock from "../../components/BalanceBlock";
import IconHeader from "../../components/IconHeader";
import PriceSection from "../../components/PriceSection";
import MaxButton from "../../components/MaxButton";
import BigNumberInput from "../../components/BigNumInput";
import CheckBox from "../../components/CheckBox";
import AddressBlock from "../../components/AddressBlock";

type ProposeCandidateProps = {
  user: string;
  stake: BigNumber;
  totalStake: BigNumber;
  accountStatus: number;
};

function plausibleCandidate(candidate: string): boolean {
  return /^(0x)[0-9a-fA-F]{40}$/i.test(candidate);
}

function ProposeCandidate({
  user,
  stake,
  totalStake,
  accountStatus,
}: ProposeCandidateProps) {
  const [candidate, setCandidate] = useState("0x");

  return (
    <Container>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* User balance */}
        <div style={{ flexBasis: "62%", paddingTop: "2%" }}>
          <>
            <input
              type="text"
              value={candidate}
              onChange={(event) => {
                if (event.target.value) {
                  setCandidate(event.target.value);
                } else {
                  setCandidate("0x");
                }
              }}
            ></input>
          </>
        </div>
        <div style={{ flexBasis: "6%" }} />
        {/* Purchase coupons */}
        <div style={{ flexBasis: "32%", paddingTop: "2%" }}>
          <Button
            /*  wide
            icon={<IconToken />} */
            title="Propose"
            onClick={() => {
              recordVote(
                ESDS.addr,
                candidate,
                1 // APPROVE
              );
            }}
            /*      disabled={
              user === "" ||
              !canPropose(stake, totalStake) ||
              !plausibleCandidate(candidate) ||
              accountStatus === 1
            } */
          />
        </div>
      </div>
    </Container>
  );
}

export default ProposeCandidate;
