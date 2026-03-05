"use client";

import { AppConfig, UserSession, showConnect } from "@stacks/connect";

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });

export default function ConnectWallet() {

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: "Stacks March Lottery",
        icon: window.location.origin + "/logo.png",
      },
      userSession,
      onFinish: () => {
        window.location.reload();
      },
    });
  };

  if (userSession.isUserSignedIn()) {
    const userData = userSession.loadUserData();
    return (
      <p>
        Wallet connected: {userData.profile.stxAddress.mainnet}
      </p>
    );
  }

  return (
    <button
      onClick={connectWallet}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        background: "black",
        color: "white",
        borderRadius: "8px",
        border: "none"
      }}
    >
      Connect Wallet
    </button>
  );
}
