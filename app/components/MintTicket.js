"use client";

import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { useState } from "react";

const network = new StacksMainnet();

export default function MintTicket() {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [wallet, setWallet] = useState(null);

  const mint = async () => {
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
      onFinish: async (data) => {
        console.log("Transaction submitted:", data);

        // 1️⃣ Sacamos la wallet de la transacción
        const txSender = data.tx.raw_tx.sender || null;
        if (!txSender) return;

        setWallet(txSender);

        // 2️⃣ Llamamos a la API serverless para generar número
        const res = await fetch("/api/mint-number", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet: txSender }),
        });
        const result = await res.json();
        setTicketNumber(result.number);
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
