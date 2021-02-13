import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { claimPool, unbondPool, withdrawPool } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";
import { ESD, UNI } from "../../constants/tokens";

//Components
import Container from "../../components/Container";
import BalanceBlock from "../../components/BalanceBlock";
import Button from "../../components/Button";

type MigrateProps = {
  legacyPoolAddress: string;
  staged: BigNumber;
  claimable: BigNumber;
  bonded: BigNumber;
  status: number;
  isRewardNegative: boolean;
};

function Migrate({
  legacyPoolAddress,
  staged,
  claimable,
  bonded,
  status,
  isRewardNegative,
}: MigrateProps) {
  const [unbonded, setUnbonded] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);
  const [claimed, setClaimed] = useState(false);

  return (
    <Container>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Unbond UNI-V2 within Pool */}
        <div style={{ flexBasis: "32%", paddingTop: "2%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "60%" }}>
              <BalanceBlock asset="Bonded" balance={bonded} suffix={"UNI-V2"} />
              <Button
                /*      wide
                icon={<IconCircleMinus />} */
                title="Unbond"
                onClick={() => {
                  unbondPool(
                    legacyPoolAddress,
                    toBaseUnitBN(bonded, UNI.decimals),
                    (hash) => setUnbonded(hash.length > 0)
                  );
                }}
                /*     disabled={
                  legacyPoolAddress === "" ||
                  !isPos(bonded) ||
                  unbonded ||
                  isRewardNegative
                } */
              />
            </div>
          </div>
        </div>
        {/* Withdraw UNI-V2 within Pool */}
        <div style={{ flexBasis: "32%", paddingTop: "2%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "60%" }}>
              <BalanceBlock asset="Staged" balance={staged} suffix={"UNI-V2"} />
              <Button
                /*   wide
                icon={<IconCircleMinus />} */
                title="Withdraw"
                onClick={() => {
                  withdrawPool(
                    legacyPoolAddress,
                    toBaseUnitBN(staged, UNI.decimals),
                    (hash) => setWithdrawn(hash.length > 0)
                  );
                }}
                /*       disabled={
                  legacyPoolAddress === "" ||
                  !isPos(staged) ||
                  withdrawn ||
                  status !== 0
                } */
              />
            </div>
          </div>
        </div>
        {/* Claim ESD within Pool */}
        <div style={{ flexBasis: "32%", paddingTop: "2%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "60%" }}>
              <BalanceBlock
                asset="Claimable"
                balance={claimable}
                suffix={"ESD"}
              />
              <Button
                /*  wide
                icon={<IconArrowDown />} */
                title="Claim"
                onClick={() => {
                  claimPool(
                    legacyPoolAddress,
                    toBaseUnitBN(claimable, ESD.decimals),
                    (hash) => setClaimed(hash.length > 0)
                  );
                }}
                /*  disabled={
                  legacyPoolAddress === "" ||
                  !isPos(claimable) ||
                  claimed ||
                  status !== 0
                } */
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Migrate;
