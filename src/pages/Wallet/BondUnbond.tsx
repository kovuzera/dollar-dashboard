import React, { useState } from "react";

import BigNumber from "bignumber.js";
import BalanceBlock from "../../components/BalanceBlock";
import Container from "../../components/Container";
import MaxButton from "../../components/MaxButton";
import Button from "../../components/Button";
import { bond, unbondUnderlying } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";
import { ESD, ESDS } from "../../constants/tokens";
import TextBlock from "../../components/TextBlock";
import BigNumberInput from "../../components/BigNumInput";

type BondUnbondProps = {
  staged: BigNumber;
  bonded: BigNumber;
  status: number;
  lockup: number;
};

function BondUnbond({ staged, bonded, status, lockup }: BondUnbondProps) {
  const [bondAmount, setBondAmount] = useState(new BigNumber(0));
  const [unbondAmount, setUnbondAmount] = useState(new BigNumber(0));

  return (
    <div>
      <div>
        {/* Total bonded */}
        <div>
          <BalanceBlock asset="Bonded" balance={bonded} suffix={"ESD"} />
        </div>
        {/* Total bonded */}
        <div>
          <TextBlock
            label="Exit Lockup"
            text={
              lockup === 0 ? "" : lockup === 1 ? "1 epoch" : `${lockup} epochs`
            }
          />
        </div>
        {/* Bond Døllar within DAO */}
        <div>
          <div>
            <div>
              <BigNumberInput
                adornment="ESD"
                value={bondAmount}
                setter={setBondAmount}
              />
              <MaxButton
                onClick={() => {
                  setBondAmount(staged);
                }}
              />
            </div>
            <div>
              <Button
                title="Bond"
                onClick={() => {
                  bond(ESDS.addr, toBaseUnitBN(bondAmount, ESD.decimals));
                }}
              />
            </div>
          </div>
        </div>
        <div />
        {/* Unbond Døllar within DAO */}
        <div>
          <div>
            <div>
              <>
                <BigNumberInput
                  adornment="ESD"
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
                title="Unbond"
                onClick={() => {
                  unbondUnderlying(
                    ESDS.addr,
                    toBaseUnitBN(unbondAmount, ESD.decimals)
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <span>Bonding events will restart the lockup timer</span>
      </div>
    </div>
  );
}

export default BondUnbond;
