"use client";

import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { useState } from "react";

const network = new StacksMainnet();

export default function MintTicket() {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  const mint = async () => {
    setLoading(true);

    // Si no tenemos wallet, pedimos al usuario
    let userWallet = wallet;
    if (!userWallet) {
      userWallet = prompt(
        "Enter your Stacks wallet address to receive your ticket:"
      );
      if (!userWallet) {
        setLoading(false);
        return;
      }
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
          .then((res) => res.json())
          .then((data) => setTicketNumber(data.number))
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      },
    };

    await openContractCall(txOptions);
  };

  return (
    <div
      style={{
        textAlign: "center",
        background: "linear-gradient(145deg, #fff4e6, #ffe6cc)",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <button
        onClick={mint}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "14px 28px",
          background: loading
            ? "#ffb366"
            : "linear-gradient(90deg, #ff6600, #ff9933)",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "0.2s",
        }}
      >
        {loading ? "Minting..." : "Mint Ticket"}
      </button>

      {wallet && (
        <p
          style={{
            marginTop: "20px",
            fontSize: "1rem",
            color: "#cc5200",
            wordBreak: "break-all",
          }}
        >
          Wallet: {wallet}
        </p>
      )}

      {ticketNumber && (
        <p
          style={{
            marginTop: "15px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#ff6600",
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          🎟️ Your ticket number: {ticketNumber}
        </p>
      )}
    </div>
  );
}
