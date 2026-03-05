"use client";

import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { useState } from "react";

const network = new StacksMainnet();

export default function MintTicket() {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [wallet, setWallet] = useState(null);

  const mint = async () => {
    try {
      const tx = await openContractCall({
        contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
        contractName: "lottery-nft",
        functionName: "mint",
        functionArgs: [],
        network,
        appDetails: {
          name: "Stacks March Lottery",
          icon: window.location.origin + "/logo.png",
        },
      });

      // Obtenemos la wallet que firmó la transacción
      let userWallet = null;
      if (tx.tx?.sender) userWallet = tx.tx.sender;
      else if (tx.tx?.raw_tx?.sender) userWallet = tx.tx.raw_tx.sender;

      if (!userWallet) {
        alert("No se pudo detectar tu wallet. Intenta otra vez.");
        return;
      }

      setWallet(userWallet);

      // Llamamos a la API serverless para generar número
      const res = await fetch("/api/mint-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: userWallet }),
      });
      const data = await res.json();
      setTicketNumber(data.number);
    } catch (err) {
      console.error("Error al mintear:", err);
      alert("Ocurrió un error durante el mint. Revisa la consola.");
    }
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
        <p style={{ marginTop: "15px", fontSize: "16px" }}>Wallet: {wallet}</p>
      )}

      {ticketNumber && (
        <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
          🎟️ Your ticket number: {ticketNumber}
        </p>
      )}
    </div>
  );
}
