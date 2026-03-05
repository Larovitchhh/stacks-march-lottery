"use client";

import MintTicket from "./components/MintTicket";

export default function Home() {
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
      <p>Click mint to receive your lottery ticket (000-999)</p>

      <MintTicket />
    </main>
  );
}
