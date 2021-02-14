import React, { useState } from "react";

import BigNumber from "bignumber.js";
import { approve, purchaseCoupons } from "../../utils/web3";

import { isPos, toBaseUnitBN, toTokenUnitsBN } from "../../utils/number";
import { ESD, ESDS } from "../../constants/tokens";
import { MAX_UINT256 } from "../../constants/values";
import { getCouponPremium } from "../../utils/infura";

//Components
import Container from "../../components/Container";
import Button from "../../components/Button";
import BalanceBlock from "../../components/BalanceBlock";
import PriceSection from "../../components/PriceSection";
import MaxButton from "../../components/MaxButton";
import BigNumberInput from "../../components/BigNumInput";

type PurchaseCouponsProps = {
  user: string;
  allowance: BigNumber;
  balance: BigNumber;
  debt: BigNumber;
};

function PurchaseCoupons({
  user,
  balance,
  allowance,
  debt,
}: PurchaseCouponsProps) {
  const [purchaseAmount, setPurchaseAmount] = useState(new BigNumber(0));
  const [premium, setPremium] = useState(new BigNumber(0));

  const updatePremium = async (purchaseAmount) => {
    if (purchaseAmount.lte(new BigNumber(0))) {
      setPremium(new BigNumber(0));
      return;
    }
    const purchaseAmountBase = toBaseUnitBN(purchaseAmount, ESD.decimals);
    const premium = await getCouponPremium(ESDS.addr, purchaseAmountBase);
    const premiumFormatted = toTokenUnitsBN(premium, ESD.decimals);
    setPremium(premiumFormatted);
  };

  return (
    <Container>
      {allowance.comparedTo(MAX_UINT256) === 0 ? (
        <div>
          <div>
            <BalanceBlock asset={`Balance`} balance={balance} suffix={" ESD"} />
          </div>
          <div />
          <div>
            <div>
              <div>
                <BigNumberInput
                  adornment="ESD"
                  value={purchaseAmount}
                  setter={(value) => {
                    setPurchaseAmount(value);
                    isPos(value)
                      ? updatePremium(value)
                      : updatePremium(new BigNumber(0));
                  }}
                />
                <MaxButton
                  onClick={() => {
                    const maxPurchaseAmount =
                      debt.comparedTo(balance) > 0 ? balance : debt;
                    setPurchaseAmount(maxPurchaseAmount);
                    updatePremium(maxPurchaseAmount);
                  }}
                />
              </div>
              <div>
                <Button
                  /*  wide
                  icon={<IconCircleMinus />} */
                  title="Burn"
                  onClick={() => {
                    purchaseCoupons(
                      ESDS.addr,
                      toBaseUnitBN(purchaseAmount, ESD.decimals)
                    );
                  }}
                  disabled={
                    user === "" ||
                    debt.isZero() ||
                    balance.isZero() ||
                    !isPos(purchaseAmount)
                  }
                />
              </div>
            </div>
            <PriceSection label="Coupons " amt={purchaseAmount.plus(premium)} />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <BalanceBlock asset={`Døllar Balance`} balance={balance} />
          </div>
          <div />
          <div>
            <Button
              /*   wide
              icon={<IconCirclePlus />} */
              title="Approve"
              onClick={() => {
                approve(ESD.addr, ESDS.addr);
              }}
              disabled={user === ""}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default PurchaseCoupons;
