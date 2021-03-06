import React, { useEffect, useState } from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { UseWalletProvider } from "use-wallet";
import { updateModalMode } from "./utils/web3";
import { storePreference, getPreference } from "./utils/storage";

//Components
import Container from "./components/Container";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
/* import NavBar from "./components/backup-components/NavBar";
import HomePage from "./components/backup-components/HomePage";
import Trade from "./components/Trade/index";
import Footer from "./components/backup-components/Footer";
import Wallet from "./components/backup-components/Wallet";
import EpochDetail from "./components/backup-components/EpochDetail";
import CouponMarket from "./components/backup-components/CouponMarket";
import Governance from "./components/Governance";
import Candidate from "./components/backup-components/Candidate";
import Regulation from "./components/backup-components/Regulation";
import Pool from "./components/backup-components/Pool";
import HomePageNoWeb3 from "./components/backup-components/HomePageNoWeb3"; */

//Pages
import HomePage from "./pages/Home";
import Wallet from "./pages/Wallet";
import Pool from "./pages/Pool";
import EpochDetail from "./pages/EpochDetail";
import Regulation from "./pages/Regulation";
import CouponMarket from "./pages/CouponMarket";
import Candidate from "./pages/Candidate";
import Trade from "./pages/Trade";
import Governance from "./pages/Governance";

function App() {
  const storedTheme = getPreference("theme", "light");

  const [hasWeb3, setHasWeb3] = useState(false);
  const [user, setUser] = useState(""); // the current connected user
  const [theme, setTheme] = useState(storedTheme);

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    updateModalMode(newTheme);
    storePreference("theme", newTheme);
  };

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      if (!isCancelled) {
        // @ts-ignore
        setHasWeb3(typeof window.ethereum !== "undefined");
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
    <Router>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
          walletlink: {
            url: "https://mainnet.eth.aragon.network/",
            appName: "Coinbase Wallet",
            appLogoUrl: "",
          },
        }}
      >
        <>
          <Navbar></Navbar>
          <Container>
            <>
              <HomePage user={user}></HomePage>
              <Switch>
                <Route path="/dao/:override">
                  <Wallet user={user} />
                </Route>

                <Route path="/dao/">
                  <Wallet user={user} />
                </Route>
                <Route path="/epoch/">
                  <EpochDetail user={user} />
                </Route>
                <Route path="/coupons/:override">
                  <CouponMarket user={user} />
                </Route>
                <Route path="/coupons/">
                  <CouponMarket user={user} />
                </Route>
                <Route path="/governance/candidate/:candidate">
                  <Candidate user={user} />
                </Route>
                <Route path="/governance/">
                  <Governance user={user} />
                </Route>
                <Route path="/trade/">
                  <Trade user={user} />
                </Route>
                <Route path="/regulation/">
                  <Regulation user={user} />
                </Route>
                <Route path="/pool/:override">
                  <Pool user={user} />
                </Route>
                <Route path="/pool/">
                  <Pool user={user} />
                </Route>
              </Switch>
            </>
          </Container>
        </>
        <Footer />
      </UseWalletProvider>
    </Router>
  );
}

export default App;
