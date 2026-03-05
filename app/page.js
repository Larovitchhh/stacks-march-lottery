"use client";

import MintTicket from "./components/MintTicket";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fff7f0, #ffe6cc)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "50px 20px",
      }}
    >
      <h1
        style={{
          color: "#ff6600",
          fontSize: "3rem",
          marginBottom: "10px",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        🎰 Stacks March Lottery
      </h1>
      <p
        style={{
          color: "#cc5200",
          fontSize: "1.2rem",
          textAlign: "center",
          maxWidth: "500px",
          marginBottom: "40px",
        }}
      >
        Mint your lottery ticket and receive a random number from 000 to 999! 
        Try your luck and see if you win this month’s Stacks lottery.
      </p>

      <MintTicket />
    </main>
  );
}
