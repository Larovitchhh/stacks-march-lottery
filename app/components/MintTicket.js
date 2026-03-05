"use client";

import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { useState } from "react";

const network = new StacksMainnet();

export default function MintTicket({ wallet }) {
  const [ticketNumber, setTicketNumber] = useState(null);

  const mint = async () => {
    // 1️⃣ Ejecuta contrato
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
      onFinish: async () => {
        // 2️⃣ Genera número aleatorio usando la API serverless
        const res = await fetch("/api/mint-number", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet }),
        });
        const data = await res.json();
        setTicketNumber(data.number);
      },
    };

    await openContractCall(txOptions);
  };

  return (
    <>
      <button
        onClick={mint}
        style={{
          marginTop: "20px",
          padding: "12px 22px",
          background: "green",
          color: "white",
          borderRadius: "8px",
          border: "none",
        }}
      >
        Mint Ticket
      </button>

      {ticketNumber && (
        <p style={{ marginTop: "15px", fontSize: "18px" }}>
          🎟️ Your ticket number: {ticketNumber}
        </p>
      )}
    </>
  );
}
