import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { claimPool } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";
import { ESD } from "../../constants/tokens";

//Components
import Container from "../../components/Container";
import BigNumberInput from "../../components/BigNumInput";
import BalanceBlock from "../../components/BalanceBlock";
import MaxButton from "../../components/MaxButton";
import Button from "../../components/Button";

type ClaimProps = {
  poolAddress: string;
  claimable: BigNumber;
  status: number;
};

function Claim({ poolAddress, claimable, status }: ClaimProps) {
  const [claimAmount, setClaimAmount] = useState(new BigNumber(0));

  return (
    <Container>
      <>
        {" "}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* total Issued */}
          <div style={{ flexBasis: "32%" }}>
            <BalanceBlock
              asset="Claimable"
              balance={claimable}
              suffix={"ESD"}
            />
          </div>
          {/* Deposit UNI-V2 into Pool */}
          <div style={{ flexBasis: "35%" }} />
          <div style={{ flexBasis: "33%", paddingTop: "2%" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "60%", minWidth: "6em" }}>
                <>
                  <BigNumberInput
                    adornment="ESD"
                    value={claimAmount}
                    setter={setClaimAmount}
                    disabled={status !== 0}
                  />
                  <MaxButton
                    onClick={() => {
                      setClaimAmount(claimable);
                    }}
                  />
                </>
              </div>
              <div style={{ width: "40%", minWidth: "6em" }}>
                <Button
                  /*    wide
                icon={<IconArrowDown />} */
                  title="Claim"
                  onClick={() => {
                    claimPool(
                      poolAddress,
                      toBaseUnitBN(claimAmount, ESD.decimals),
                      (hash) => setClaimAmount(new BigNumber(0))
                    );
                  }}
                  /*  disabled={
                  poolAddress === "" || status !== 0 || !isPos(claimAmount)
                } */
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", paddingTop: "2%", textAlign: "center" }}>
          <span style={{ opacity: 0.5 }}>
            Unbond to make rewards claimable after your status is Unlocked{" "}
          </span>
        </div>
      </>
    </Container>
  );
}

export default Claim;
