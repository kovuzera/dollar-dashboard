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
        <div>
          {/* total Issued */}
          <div>
            <BalanceBlock
              asset="Claimable"
              balance={claimable}
              suffix={"ESD"}
            />
          </div>
          {/* Deposit UNI-V2 into Pool */}
          <div />
          <div>
            <div>
              <div>
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
              <div>
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
                  disabled={
                    poolAddress === "" || status !== 0 || !isPos(claimAmount)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <span>
            Unbond to make rewards claimable after your status is Unlocked
          </span>
        </div>
      </>
    </Container>
  );
}

export default Claim;
