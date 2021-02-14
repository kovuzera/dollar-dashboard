import React, { useState, useEffect } from "react";

import BigNumber from "bignumber.js";
import { getTokenBalance } from "../../utils/infura";
import { toTokenUnitsBN } from "../../utils/number";

import TradePageHeader from "./Header";
import { ESD, UNI, USDC } from "../../constants/tokens";

//Components
import Container from "../../components/Container";
import Link from "../../components/Link";
import IconHeader from "../../components/IconHeader";

function UniswapPool({ user }: { user: string }) {
  const [pairBalanceESD, setPairBalanceESD] = useState(new BigNumber(0));
  const [pairBalanceUSDC, setPairBalanceUSDC] = useState(new BigNumber(0));

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const [pairBalanceESDStr, pairBalanceUSDCStr] = await Promise.all([
        getTokenBalance(ESD.addr, UNI.addr),
        getTokenBalance(USDC.addr, UNI.addr),
      ]);

      if (!isCancelled) {
        setPairBalanceESD(toTokenUnitsBN(pairBalanceESDStr, ESD.decimals));
        setPairBalanceUSDC(toTokenUnitsBN(pairBalanceUSDCStr, USDC.decimals));
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
      <IconHeader icon={<i className="fas fa-exchange-alt" />} text="Trade" />

      <TradePageHeader
        pairBalanceESD={pairBalanceESD}
        pairBalanceUSDC={pairBalanceUSDC}
        uniswapPair={UNI.addr}
      />

      <div>
        <div>
          <MainButton
            title="Info"
            description="View ESD-USDC pool stats."
            icon={<i className="fas fa-chart-area" />}
            href={
              "https://uniswap.info/pair/0x88ff79eb2bc5850f27315415da8685282c7610f9"
            }
          />
        </div>

        <div>
          <MainButton
            title="Trade"
            description="Trade døllar tokens."
            icon={<i className="fas fa-exchange-alt" />}
            href={
              "https://uniswap.exchange/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=0x36f3fd68e7325a35eb768f1aedaae9ea0689d723"
            }
          />
        </div>

        <div>
          <MainButton
            title="Supply"
            description="Supply and redeem liquidity."
            icon={<i className="fas fa-water" />}
            href={
              "https://uniswap.exchange/add/0x36f3fd68e7325a35eb768f1aedaae9ea0689d723/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            }
          />
        </div>
      </div>
    </>
  );
}

type MainButtonProps = {
  title: string;
  description: string;
  icon: any;
  href: string;
};

function MainButton({ title, description, icon, href }: MainButtonProps) {
  return (
    <Link href={href}>
      <Container>
        <div>
          <div>{title}</div>
          <span>{icon}</span>
          <div> {description} </div>
        </div>
      </Container>
    </Link>
  );
}

export default UniswapPool;
