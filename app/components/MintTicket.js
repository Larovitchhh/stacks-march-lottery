"use client";

import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { useState } from "react";

const network = new StacksMainnet();

export default function MintTicket() {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  const mint = async () => {
    setLoading(true);

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

      // Detectamos wallet del usuario
      let userWallet = tx.tx?.sender || tx.tx?.raw_tx?.sender || null;
      if (!userWallet) {
        alert("No se pudo detectar tu wallet. Ingresa manualmente.");
        setLoading(false);
        return;
      }

      setWallet(userWallet);

      // Llamada a API para generar número
      const res = await fetch("/api/mint-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: userWallet }),
      });
      const data = await res.json();
      setTicketNumber(data.number);
    } catch (err) {
      console.error("Error durante el mint:", err);
      alert("Ocurrió un error durante el mint. Revisa la consola.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#fff3e6",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <button
        onClick={mint}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "14px 28px",
          background: "linear-gradient(90deg, #ff6600, #ff9933)",
          color: "white",
          fontWeight: "bold",
          fontSize: "1rem",
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
            fontSize: "0.95rem",
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
            marginTop: "10px",
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
