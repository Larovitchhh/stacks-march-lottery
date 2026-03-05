import ConnectWallet from "./components/ConnectWallet";

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

      <p>Connect your wallet to participate in the March lottery</p>

      <ConnectWallet />
    </main>
  );
}
