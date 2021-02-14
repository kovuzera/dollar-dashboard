import React from "react";

import BigNumber from "bignumber.js";

//Components
import BalanceBlock from "../../components/BalanceBlock";

//Utils
import { ownership } from "../../utils/number";

type CouponMarketHeaderProps = {
  debt: BigNumber;
  supply: BigNumber;
  coupons: BigNumber;
  premium: BigNumber;
  redeemable: BigNumber;
};

const CouponMarketHeader = ({
  debt,
  supply,
  coupons,
  premium,
  redeemable,
}: CouponMarketHeaderProps) => (
  <div>
    <div>
      <BalanceBlock
        asset="Debt Ratio"
        balance={ownership(debt, supply)}
        suffix={"%"}
      />
    </div>
    <div>
      <BalanceBlock asset="Total Debt" balance={debt} suffix={"ESD"} />
    </div>
    <div>
      <BalanceBlock asset="Coupons" balance={coupons} />
    </div>
    <div>
      <BalanceBlock
        asset="Premium"
        balance={premium.multipliedBy(100)}
        suffix={"%"}
      />
    </div>
    <div>
      <BalanceBlock asset="Redeemable" balance={redeemable} />
    </div>
  </div>
);

export default CouponMarketHeader;
