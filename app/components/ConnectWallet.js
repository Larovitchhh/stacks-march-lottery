"use client";

import { useState, useEffect } from "react";
import { showConnect, AppConfig, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });

export default function ConnectWallet({ setWallet }) {
  const [wallet, setLocalWallet] = useState(null);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setLocalWallet(userData.profile.stxAddress.mainnet);
      setWallet(userData.profile.stxAddress.mainnet);
    }
  }, [setWallet]);

  const connect = () => {
    showConnect({
      appDetails: {
        name: "Stacks March Lottery",
        icon: window.location.origin + "/logo.png",
      },
      userSession,
      onFinish: () => {
        const userData = userSession.loadUserData();
        setLocalWallet(userData.profile.stxAddress.mainnet);
        setWallet(userData.profile.stxAddress.mainnet);
      },
    });
  };

  if (wallet) {
    return <p>Wallet connected: {wallet}</p>;
  }

  return (
    <button
      onClick={connect}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        background: "black",
        color: "white",
        borderRadius: "8px",
        border: "none",
      }}
    >
      Connect Wallet
    </button>
  );
}
