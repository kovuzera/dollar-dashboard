import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { mintTestnetUSDC } from "../../utils/web3";

import { isPos, toBaseUnitBN } from "../../utils/number";
import { USDC } from "../../constants/tokens";

//Components
import Container from "../../components/Container";
import BigNumberInput from "../../components/BigNumInput";
import BalanceBlock from "../../components/BalanceBlock";
import Button from "../../components/Button";

type MintUSDCProps = {
  user: string;
  userBalanceUSDC: BigNumber;
};

function MintUSDC({ user, userBalanceUSDC }: MintUSDCProps) {
  const [mintAmount, setMintAmount] = useState(new BigNumber(0));

  return (
    <Container>
      <div style={{ display: "flex" }}>
        {/* USDC balance */}
        <div style={{ width: "30%" }}>
          <BalanceBlock asset="USDC Balance" balance={userBalanceUSDC} />
        </div>
        {/* Mint */}
        <div style={{ width: "38%" }} />
        <div style={{ width: "32%", paddingTop: "2%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "60%" }}>
              <BigNumberInput
                adornment="USDC"
                value={mintAmount}
                setter={setMintAmount}
              />
            </div>
            <div style={{ width: "40%" }}>
              <Button
                /*   wide
                icon={<IconCirclePlus />} */
                title="Mint"
                onClick={() => {
                  mintTestnetUSDC(toBaseUnitBN(mintAmount, USDC.decimals));
                }}
                /*  disabled={user === "" || !isPos(mintAmount)} */
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MintUSDC;
