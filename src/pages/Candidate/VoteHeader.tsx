import React from "react";

import BigNumber from "bignumber.js";

//Components
import BalanceBlock from "../../components/BalanceBlock";
type VoteHeaderProps = {
  approveFor: BigNumber;
  rejectFor: BigNumber;
  totalStake: BigNumber;
  showParticipation: boolean;
};

function approval(approve: BigNumber, reject: BigNumber): BigNumber {
  return approve
    .multipliedBy(10000)
    .dividedToIntegerBy(approve.plus(reject))
    .dividedBy(100);
}

function participation(
  approve: BigNumber,
  reject: BigNumber,
  totalStake: BigNumber
): BigNumber {
  return approve
    .plus(reject)
    .multipliedBy(10000)
    .dividedToIntegerBy(totalStake)
    .dividedBy(100);
}

const VoteHeader = ({
  approveFor,
  rejectFor,
  totalStake,
  showParticipation,
}: VoteHeaderProps) => (
  <div>
    <div>
      <BalanceBlock asset="Approve" balance={approveFor} suffix={"ESDS"} />
    </div>
    <div>
      <BalanceBlock asset="Reject" balance={rejectFor} suffix={"ESDS"} />
    </div>
    <div>
      <BalanceBlock
        asset="Approval"
        balance={approval(approveFor, rejectFor)}
        suffix="%"
      />
    </div>
    {showParticipation ? (
      <div>
        <BalanceBlock
          asset="Participation"
          balance={participation(approveFor, rejectFor, totalStake)}
          suffix="%"
        />
      </div>
    ) : (
      ""
    )}
  </div>
);

export default VoteHeader;
