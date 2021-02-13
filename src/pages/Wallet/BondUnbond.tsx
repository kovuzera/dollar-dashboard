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
    <Container>
      <>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* Total bonded */}
          <div style={{ flexBasis: "16%" }}>
            <BalanceBlock asset="Bonded" balance={bonded} suffix={"ESD"} />
          </div>
          {/* Total bonded */}
          <div style={{ flexBasis: "16%" }}>
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
          {/* Bond Døllar within DAO */}
          <div style={{ flexBasis: "33%", paddingTop: "2%" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "60%", minWidth: "6em" }}>
                <>
                  {/*     <BigNumberInput
                  adornment="ESD"
                  value={bondAmount}
                  setter={setBondAmount}
                /> */}
                  <MaxButton
                    onClick={() => {
                      setBondAmount(staged);
                    }}
                  />
                </>
              </div>
              <div style={{ width: "40%", minWidth: "7em" }}>
                <Button
                  title="Bond"
                  onClick={() => {
                    bond(ESDS.addr, toBaseUnitBN(bondAmount, ESD.decimals));
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ width: "2%" }} />
          {/* Unbond Døllar within DAO */}
          <div style={{ flexBasis: "33%", paddingTop: "2%" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "60%", minWidth: "6em" }}>
                <>
                  {/*      <BigNumberInput
                  adornment="ESD"
                  value={unbondAmount}
                  setter={setUnbondAmount}
                /> */}
                  <MaxButton
                    onClick={() => {
                      setUnbondAmount(bonded);
                    }}
                  />
                </>
              </div>
              <div style={{ width: "40%", minWidth: "7em" }}>
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
        <div style={{ width: "100%", paddingTop: "2%", textAlign: "center" }}>
          <span style={{ opacity: 0.5 }}>
            Bonding events will restart the lockup timer
          </span>
        </div>
      </>
    </Container>
  );
}

export default BondUnbond;
