import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { bondPool, unbondPool } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";
import { UNI } from "../../constants/tokens";

//Components
import Container from "../../components/Container";
import BigNumberInput from "../../components/BigNumInput";
import TextBlock from "../../components/TextBlock";
import BalanceBlock from "../../components/BalanceBlock";
import MaxButton from "../../components/MaxButton";
import Button from "../../components/Button";

type BondUnbondProps = {
  poolAddress: string;
  staged: BigNumber;
  bonded: BigNumber;
  status: number;
  lockup: number;
};

function BondUnbond({
  poolAddress,
  staged,
  bonded,
  status,
  lockup,
}: BondUnbondProps) {
  const [bondAmount, setBondAmount] = useState(new BigNumber(0));
  const [unbondAmount, setUnbondAmount] = useState(new BigNumber(0));

  return (
    <Container>
      <>
        <div>
          {/* Total bonded */}
          <div>
            <BalanceBlock asset="Bonded" balance={bonded} suffix={"UNI-V2"} />
          </div>
          {/* Exit lockup */}
          <div>
            <TextBlock
              label="Exit Lockup"
              text={
                lockup === 0
                  ? ""
                  : lockup === 1
                  ? "1 epoch"
                  : `${lockup} epochs`
              }
            />
          </div>
          {/* Bond UNI-V2 within Pool */}
          <div>
            <div>
              <div>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={bondAmount}
                    setter={setBondAmount}
                  />
                  <MaxButton
                    onClick={() => {
                      setBondAmount(staged);
                    }}
                  />
                </>
              </div>
              <div>
                <Button
                  /*   wide
                icon={status === 0 ? <IconCirclePlus /> : <IconCaution />} */
                  title="Bond"
                  onClick={() => {
                    bondPool(
                      poolAddress,
                      toBaseUnitBN(bondAmount, UNI.decimals),
                      (hash) => setBondAmount(new BigNumber(0))
                    );
                  }}
                  disabled={poolAddress === "" || !isPos(bondAmount)}
                />
              </div>
            </div>
          </div>
          <div />
          {/* Unbond UNI-V2 within Pool */}
          <div>
            <div>
              <div>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={unbondAmount}
                    setter={setUnbondAmount}
                  />
                  <MaxButton
                    onClick={() => {
                      setUnbondAmount(bonded);
                    }}
                  />
                </>
              </div>
              <div>
                <Button
                  /*  wide
                icon={status === 0 ? <IconCircleMinus /> : <IconCaution />} */
                  title="Unbond"
                  onClick={() => {
                    unbondPool(
                      poolAddress,
                      toBaseUnitBN(unbondAmount, UNI.decimals),
                      (hash) => setUnbondAmount(new BigNumber(0))
                    );
                  }}
                  disabled={poolAddress === "" || !isPos(unbondAmount)}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <span>Bonding events will restart the lockup timer </span>
        </div>
      </>
    </Container>
  );
}

export default BondUnbond;
