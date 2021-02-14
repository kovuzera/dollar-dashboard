import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//Assets
import LogoGif from "../../assets/logo/wgreeninfinite.gif";

//Components
import Button from "../../components/Button";

//Styles
import "./style.css";

function epochformatted() {
  const epochStart = 1599148800;
  const epochPeriod = 8 * 60 * 60;
  const hour = 60 * 60;
  const minute = 60;
  const unixTimeSec = Math.floor(Date.now() / 1000);

  let epochRemainder = unixTimeSec - epochStart;
  const epoch = Math.floor(epochRemainder / epochPeriod);
  epochRemainder -= epoch * epochPeriod;
  const epochHour = Math.floor(epochRemainder / hour);
  epochRemainder -= epochHour * hour;
  const epochMinute = Math.floor(epochRemainder / minute);
  epochRemainder -= epochMinute * minute;
  return `${epoch}-0${epochHour}:${
    epochMinute > 9 ? epochMinute : "0" + epochMinute.toString()
  }:${epochRemainder > 9 ? epochRemainder : "0" + epochRemainder.toString()}`;
}

type HomePageProps = {
  user: string;
};

function HomePage({ user }: HomePageProps) {
  const history = useHistory();

  const [epochTime, setEpochTime] = useState("0-00:00:00");

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      if (!isCancelled) {
        setEpochTime(epochformatted());
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <>
      <div className="Home">
        <div className="button-row">
          <Button title="Connect"></Button>
        </div>
        <div className="content">
          <div className="left-content">
            <h1>Descentralized Composable Stable</h1>
            <p>
              Control Loop (CLP) is an algorithmic stablecoin built to be the
              reserve currency of Decentralized Finance.
            </p>
          </div>
          <div className="right-content">
            <img src={LogoGif} alt="Control Loop"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
