import React, { useState } from "react";

//Components
import BigNumber from "bignumber.js";
import BalanceBlock from "../../components/BalanceBlock";
import Container from "../../components/Container";
import MaxButton from "../../components/MaxButton";
import Button from "../../components/Button"; /* 
import BigNumberInput from "../../components/BigNumberInput"; */

//Utils
import { approve, deposit, withdraw } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";

//Constants
import { ESD, ESDS } from "../../constants/tokens";
import { MAX_UINT256 } from "../../constants/values";

//Icons

type WithdrawDepositProps = {
  user: string;
  balance: BigNumber;
  allowance: BigNumber;
  stagedBalance: BigNumber;
  status: number;
};

function WithdrawDeposit({
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
              suffix={"ESD"}
            />
          </div>
          {/* Deposit Døllar into DAO */}
          <div style={{ flexBasis: "33%", paddingTop: "2%" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "60%", minWidth: "6em" }}>
                <>
                  {/*      <BigNumberInput
                    adornment="ESD"
                    value={depositAmount}
                    setter={setDepositAmount}
                    disabled={status !== 0}
                  /> */}
                  <MaxButton
                    onClick={() => {
                      setDepositAmount(balance);
                    }}
                  />
                </>
              </div>
              <div style={{ width: "40%", minWidth: "6em" }}>
                <Button
                  title="Deposit"
                  onClick={() => {
                    deposit(
                      ESDS.addr,
                      toBaseUnitBN(depositAmount, ESD.decimals)
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div />

          <div>
            <div>
              <div>
                <>
                  {/*   <BigNumberInput
                    adornment="ESD"
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
                  title="Withdraw"
                  onClick={() => {
                    withdraw(
                      ESDS.addr,
                      toBaseUnitBN(withdrawAmount, ESD.decimals)
                    );
                  }}
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
              suffix={"ESD"}
            />
          </div>
          <div style={{ flexBasis: "35%" }} />
          {/* Approve DAO to spend Døllar */}
          <div style={{ flexBasis: "33%", paddingTop: "2%" }}>
            <Button
              /*   wide
              icon={<IconCirclePlus />} */
              title="Approve"
              onClick={() => {
                approve(ESD.addr, ESDS.addr);
              }} /* 
              disabled={user === ""} */
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default WithdrawDeposit;
