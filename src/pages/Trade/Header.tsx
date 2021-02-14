import React from "react";
import BigNumber from "bignumber.js";

//Components
import AddressBlock from "../../components/AddressBlock";
import BalanceBlock from "../../components/BalanceBlock";

type TradePageHeaderProps = {
  pairBalanceESD: BigNumber;
  pairBalanceUSDC: BigNumber;
  uniswapPair: string;
};

const TradePageHeader = ({
  pairBalanceESD,
  pairBalanceUSDC,
  uniswapPair,
}: TradePageHeaderProps) => {
  const price = pairBalanceUSDC.dividedBy(pairBalanceESD);

  return (
    <div>
      <div>
        <BalanceBlock asset="ESD Price" balance={price} suffix={"USDC"} />
      </div>
      <div>
        <BalanceBlock
          asset="ESD Liquidity"
          balance={pairBalanceESD}
          suffix={"ESD"}
        />
      </div>
      <div>
        <BalanceBlock
          asset="USDC Liquidity"
          balance={pairBalanceUSDC}
          suffix={"USDC"}
        />
      </div>
      <div>
        <AddressBlock label="Uniswap Contract" address={uniswapPair} />
      </div>
    </div>
  );
};

export default TradePageHeader;
