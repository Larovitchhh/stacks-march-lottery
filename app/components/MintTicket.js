"use client";

import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { useState } from "react";

const network = new StacksMainnet();

export default function MintTicket() {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [wallet, setWallet] = useState("");

  const mint = async () => {
    // Si no tenemos wallet, pedimos al usuario
    let userWallet = wallet;
    if (!userWallet) {
      userWallet = prompt("Enter your Stacks wallet address to receive your ticket:");
      if (!userWallet) return;
      setWallet(userWallet);
    }

    // Abrir wallet y mintear NFT
    const txOptions = {
      contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
      contractName: "lottery-nft",
      functionName: "mint",
      functionArgs: [],
      network,
      appDetails: {
        name: "Stacks March Lottery",
        icon: window.location.origin + "/logo.png",
      },
      onFinish: () => {
        // Después de mintear, generamos número aleatorio con fetch
        fetch("/api/mint-number", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet: userWallet }),
        })
          .then(res => res.json())
          .then(data => setTicketNumber(data.number))
          .catch(err => console.error(err));
      },
    };

    await openContractCall(txOptions);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={mint}
        style={{
          marginTop: "20px",
          padding: "12px 22px",
          background: "green",
          color: "white",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Mint Ticket
      </button>

      {wallet && (
        <p style={{ marginTop: "15px", fontSize: "16px" }}>
          Wallet: {wallet}
        </p>
      )}

      {ticketNumber && (
        <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
          🎟️ Your ticket number: {ticketNumber}
        </p>
      )}
    </div>
  );
}
