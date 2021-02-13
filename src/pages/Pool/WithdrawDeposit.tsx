import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { approve, depositPool, withdrawPool } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";
import { UNI } from "../../constants/tokens";
import { MAX_UINT256 } from "../../constants/values";

//Components
import Container from "../../components/Container";
import Button from "../../components/Button";
import BalanceBlock from "../../components/BalanceBlock";
import MaxButton from "../../components/MaxButton";
import BigNumberInput from "../../components/BigNumInput";

type WithdrawDepositProps = {
  poolAddress: string;
  user: string;
  balance: BigNumber;
  allowance: BigNumber;
  stagedBalance: BigNumber;
  status: number;
};

function WithdrawDeposit({
  poolAddress,
  user,
  balance,
  allowance,
  stagedBalance,
  status,
}: WithdrawDepositProps) {
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
  const [withdrawAmount, setWithdrawAmount] = useState(new BigNumber(0));

  return (
    <Container>
      {allowance.comparedTo(MAX_UINT256) === 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* total Issued */}
          <div style={{ flexBasis: "32%" }}>
            <BalanceBlock
              asset="Staged"
              balance={stagedBalance}
              suffix={"UNI-V2"}
            />
          </div>
          {/* Deposit UNI-V2 into Pool */}
          <div style={{ flexBasis: "33%", paddingTop: "2%" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "60%", minWidth: "6em" }}>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={depositAmount}
                    setter={setDepositAmount}
                    disabled={status !== 0}
                  />
                  <MaxButton
                    onClick={() => {
                      setDepositAmount(balance);
                    }}
                  />
                </>
              </div>
              <div>
                <Button
                  /*    wide
                  icon={status === 0 ? <IconCirclePlus /> : <IconLock />} */
                  title="Deposit"
                  onClick={() => {
                    depositPool(
                      poolAddress,
                      toBaseUnitBN(depositAmount, UNI.decimals),
                      (hash) => setDepositAmount(new BigNumber(0))
                    );
                  }}
                  /*  disabled={
                    poolAddress === "" || status !== 0 || !isPos(depositAmount)
                  } */
                />
              </div>
            </div>
          </div>
          <div />
          {/* Withdraw Døllar from DAO */}
          <div>
            <div>
              <div>
                <>
                  {/*    <BigNumberInput
                    adornment="UNI-V2"
                    value={withdrawAmount}
                    setter={setWithdrawAmount}
                    disabled={status !== 0}
                  /> */}
                  <MaxButton
                    onClick={() => {
                      setWithdrawAmount(stagedBalance);
                    }}
                  />
                </>
              </div>
              <div style={{ width: "40%", minWidth: "7em" }}>
                <Button
                  /*   wide
                  icon={status === 0 ? <IconCircleMinus /> : <IconLock />} */
                  title="Withdraw"
                  onClick={() => {
                    withdrawPool(
                      poolAddress,
                      toBaseUnitBN(withdrawAmount, UNI.decimals),
                      (hash) => setWithdrawAmount(new BigNumber(0))
                    );
                  }}
                  /*    disabled={
                    poolAddress === "" || status !== 0 || !isPos(withdrawAmount)
                  } */
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* total Issued */}
          <div style={{ flexBasis: "32%" }}>
            <BalanceBlock
              asset="Staged"
              balance={stagedBalance}
              suffix={"UNI-V2"}
            />
          </div>
          <div style={{ flexBasis: "35%" }} />
          {/* Approve Pool to spend UNI-V2 */}
          <div style={{ flexBasis: "33%", paddingTop: "2%" }}>
            <Button
              /*    wide
              icon={<IconCirclePlus />} */
              title="Approve"
              onClick={() => {
                approve(UNI.addr, poolAddress);
              }}
              /*   disabled={poolAddress === "" || user === ""} */
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default WithdrawDeposit;
