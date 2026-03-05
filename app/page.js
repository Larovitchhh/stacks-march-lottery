export default function Home() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "sans-serif"
    }}>
      
      <h1>🎰 Stacks March Lottery</h1>

      <p>
        Mint your ticket and receive a random number from 000 to 999
      </p>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "black",
          color: "white",
          borderRadius: "8px",
          border: "none"
        }}
      >
        Mint Ticket
      </button>

    </main>
  );
}
