import React, { useEffect } from "react";
import { useWallet } from "use-wallet";

//Components
import Button from "../Button";

type ConnectModalProps = {
  visible: boolean;
  onClose: Function;
  onConnect: Function;
};

function ConnectModal({ visible, onClose, onConnect }: ConnectModalProps) {
  const wallet = useWallet();

  const connectMetamask = () => {
    wallet.connect("injected");
  };

  const connectWalletConnect = () => {
    wallet.connect("walletconnect");
  };

  const connectCoinbase = () => {
    wallet.connect("walletlink");
  };

  useEffect(() => {
    if (wallet.account) {
      onConnect && onConnect(wallet);
      onClose && onClose();
    }
  }, [wallet, onConnect, onClose]);

  return (
    <div /* visible={visible} */ /* onClose={onClose} */>
      <p>Select a wallet provider</p>

      <div style={{ width: "50%", margin: "auto", padding: "1%" }}>
        <Button
          title="Metamask"
          icon={`./wallets/metamask-fox.svg`}
          onClick={connectMetamask}
        />
      </div>
      <div style={{ width: "50%", margin: "auto", padding: "1%" }}>
        <Button
          title={"WalletConnect"}
          icon={`./wallets/wallet-connect.svg`}
          onClick={connectWalletConnect}
        />
      </div>
      <div style={{ width: "50%", margin: "auto", padding: "1%" }}>
        <Button
          title={"Coinbase Wallet"}
          icon={`./wallets/coinbase-wallet.png`}
          onClick={connectCoinbase}
        />
      </div>
    </div>
  );
}

export default ConnectModal;
