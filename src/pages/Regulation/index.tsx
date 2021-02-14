import React, { useState, useEffect } from "react";

import {
  getCouponPremium,
  getTotalCoupons,
  getTotalCouponsUnderlying,
  getPoolTotalClaimable,
  getPoolTotalRewarded,
  getTokenBalance,
  getTokenTotalSupply,
  getTotalBonded,
  getTotalDebt,
  getTotalRedeemable,
  getTotalStaged,
} from "../../utils/infura";
import { ESD, ESDS, UNI } from "../../constants/tokens";
import { toTokenUnitsBN } from "../../utils/number";
import BigNumber from "bignumber.js";
import RegulationHeader from "./Header";
import RegulationHistory from "./RegulationHistory";

//Components
import IconHeader from "../../components/IconHeader";

import { getLegacyPoolAddress, getPoolAddress } from "../../utils/pool";

const ONE_COUPON = new BigNumber(10).pow(18);

function Regulation({ user }: { user: string }) {
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));
  const [totalBonded, setTotalBonded] = useState(new BigNumber(0));
  const [totalStaged, setTotalStaged] = useState(new BigNumber(0));
  const [totalRedeemable, setTotalRedeemable] = useState(new BigNumber(0));
  const [poolLiquidity, setPoolLiquidity] = useState(new BigNumber(0));
  const [poolTotalRewarded, setPoolTotalRewarded] = useState(new BigNumber(0));
  const [poolTotalClaimable, setPoolTotalClaimable] = useState(
    new BigNumber(0)
  );
  const [legacyPoolTotalRewarded, setLegacyPoolTotalRewarded] = useState(
    new BigNumber(0)
  );
  const [legacyPoolTotalClaimable, setLegacyPoolTotalClaimable] = useState(
    new BigNumber(0)
  );
  const [totalDebt, setTotalDebt] = useState(new BigNumber(0));
  const [totalCoupons, setTotalCoupons] = useState(new BigNumber(0));
  const [totalCouponsUnderlying, setTotalCouponsUnderlying] = useState(
    new BigNumber(0)
  );
  const [couponPremium, setCouponPremium] = useState(new BigNumber(0));

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const poolAddress = await getPoolAddress();
      const legacyPoolAddress = getLegacyPoolAddress(poolAddress);

      const [
        totalSupplyStr,
        totalBondedStr,
        totalStagedStr,
        totalRedeemableStr,
        poolLiquidityStr,
        poolTotalRewardedStr,
        poolTotalClaimableStr,
        legacyPoolTotalRewardedStr,
        legacyPoolTotalClaimableStr,
        totalDebtStr,
        totalCouponsStr,
        totalCouponsUnderlyingStr,
      ] = await Promise.all([
        getTokenTotalSupply(ESD.addr),

        getTotalBonded(ESDS.addr),
        getTotalStaged(ESDS.addr),
        getTotalRedeemable(ESDS.addr),

        getTokenBalance(ESD.addr, UNI.addr),
        getPoolTotalRewarded(poolAddress),
        getPoolTotalClaimable(poolAddress),

        getPoolTotalRewarded(legacyPoolAddress),
        getPoolTotalClaimable(legacyPoolAddress),

        getTotalDebt(ESDS.addr),
        getTotalCoupons(ESDS.addr),
        getTotalCouponsUnderlying(ESDS.addr),
      ]);

      if (!isCancelled) {
        setTotalSupply(toTokenUnitsBN(totalSupplyStr, ESD.decimals));

        setTotalBonded(toTokenUnitsBN(totalBondedStr, ESD.decimals));
        setTotalStaged(toTokenUnitsBN(totalStagedStr, ESD.decimals));
        setTotalRedeemable(toTokenUnitsBN(totalRedeemableStr, ESD.decimals));

        setPoolLiquidity(toTokenUnitsBN(poolLiquidityStr, ESD.decimals));
        setPoolTotalRewarded(
          toTokenUnitsBN(poolTotalRewardedStr, ESD.decimals)
        );
        setPoolTotalClaimable(
          toTokenUnitsBN(poolTotalClaimableStr, ESD.decimals)
        );

        setLegacyPoolTotalRewarded(
          toTokenUnitsBN(legacyPoolTotalRewardedStr, ESD.decimals)
        );
        setLegacyPoolTotalClaimable(
          toTokenUnitsBN(legacyPoolTotalClaimableStr, ESD.decimals)
        );

        setTotalDebt(toTokenUnitsBN(totalDebtStr, ESD.decimals));
        setTotalCoupons(toTokenUnitsBN(totalCouponsStr, ESD.decimals));
        setTotalCouponsUnderlying(
          toTokenUnitsBN(totalCouponsUnderlyingStr, ESD.decimals)
        );

        if (new BigNumber(totalDebtStr).isGreaterThan(ONE_COUPON)) {
          const couponPremiumStr = await getCouponPremium(
            ESDS.addr,
            ONE_COUPON
          );
          setCouponPremium(toTokenUnitsBN(couponPremiumStr, ESD.decimals));
        } else {
          setCouponPremium(new BigNumber(0));
        }
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <>
      <IconHeader
        icon={<i className="fas fa-chart-area" />}
        text="Supply Regulation"
      />

      <RegulationHeader
        totalSupply={totalSupply}
        totalBonded={totalBonded}
        totalStaged={totalStaged}
        totalRedeemable={totalRedeemable}
        poolLiquidity={poolLiquidity}
        poolRewarded={poolTotalRewarded}
        poolClaimable={poolTotalClaimable}
        legacyPoolRewarded={legacyPoolTotalRewarded}
        legacyPoolClaimable={legacyPoolTotalClaimable}
        totalDebt={totalDebt}
        totalCoupons={totalCoupons}
        totalCouponsUnderlying={totalCouponsUnderlying}
        couponPremium={couponPremium}
      />

      <p>Regulation History</p>

      <RegulationHistory user={user} />
    </>
  );
}

export default Regulation;
