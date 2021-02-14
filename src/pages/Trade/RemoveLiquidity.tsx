import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { removeLiquidity } from "../../utils/web3";

import { toBaseUnitBN } from "../../utils/number";
import { decreaseWithSlippage } from "../../utils/calculation";
import { ESD, UNI, USDC } from "../../constants/tokens";

//Components
import Container from "../../components/Container";
import Button from "../../components/Button";
import BalanceBlock from "../../components/BalanceBlock";
import PriceSection from "../../components/PriceSection";
import MaxButton from "../../components/MaxButton";
import BigNumberInput from "../../components/BigNumInput";

type RemoveLiquidityProps = {
  userBalanceUNI: BigNumber;
  pairBalanceESD: BigNumber;
  pairBalanceUSDC: BigNumber;
  pairTotalSupplyUNI: BigNumber;
};

function RemoveLiquidity({
  userBalanceUNI,
  pairBalanceESD,
  pairBalanceUSDC,
  pairTotalSupplyUNI,
}: RemoveLiquidityProps) {
  const [withdrawAmountUNI, setWithdrawAmountUNI] = useState(new BigNumber(0));

  const poolPortion = withdrawAmountUNI.div(pairTotalSupplyUNI);
  const estimatedUSDCReceived = pairBalanceUSDC.times(poolPortion);
  const estimatedESDReceived = pairBalanceESD.times(poolPortion);

  const minUSDCReceived = decreaseWithSlippage(estimatedUSDCReceived);
  const minESDReceived = decreaseWithSlippage(estimatedESDReceived);

  const onChangeWithdrawAmountUNI = (amountUNI) => {
    if (!amountUNI) {
      setWithdrawAmountUNI(new BigNumber(0));
      return;
    }
    const amountUNIBN = new BigNumber(amountUNI);
    setWithdrawAmountUNI(amountUNIBN);
  };

  return (
    <Container>
      <div style={{ display: "flex" }}>
        {/* Pool Token in Hold */}
        <div style={{ width: "30%" }}>
          <BalanceBlock asset="Pair Token Balance" balance={userBalanceUNI} />
        </div>
        {/* Remove */}
        <div style={{ width: "70%", paddingTop: "2%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "35%", marginRight: "5%" }}>
              <BigNumberInput
                adornment="UNI-V2"
                value={withdrawAmountUNI}
                setter={onChangeWithdrawAmountUNI}
              />
              <MaxButton onClick={() => setWithdrawAmountUNI(userBalanceUNI)} />
            </div>
            <div style={{ width: "35%", marginRight: "5%" }}>
              <>
                <PriceSection
                  label="You get "
                  amt={estimatedUSDCReceived}
                  symbol=" USDC"
                />
                <PriceSection
                  label="+ "
                  amt={estimatedESDReceived}
                  symbol=" ESD"
                />
              </>
            </div>
            <div style={{ width: "30%" }}>
              <Button
                /*    wide
                icon={<IconCircleMinus />} */
                title="Remove Liquidity"
                onClick={() => {
                  removeLiquidity(
                    toBaseUnitBN(withdrawAmountUNI, UNI.decimals),
                    toBaseUnitBN(minESDReceived, ESD.decimals),
                    toBaseUnitBN(minUSDCReceived, USDC.decimals)
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default RemoveLiquidity;
