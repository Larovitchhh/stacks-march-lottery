"use client";

import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import MintTicket from "./components/MintTicket";

export default function Home() {
  const [wallet, setWallet] = useState(null);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <h1>🎰 Stacks March Lottery</h1>
      <p>Mint a lottery ticket and receive a random number from 000 to 999</p>

      <ConnectWallet setWallet={setWallet} />

      {wallet && <MintTicket wallet={wallet} />}
    </main>
  );
}
