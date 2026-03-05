"use client";

import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";

const network = new StacksMainnet();

export default function MintTicket() {

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
      onFinish: (data) => {
        console.log("Transaction submitted:", data);
      }
    };

    await openContractCall(txOptions);
  };

  return (
    <button
      onClick={mint}
      style={{
        marginTop: "20px",
        padding: "12px 22px",
        background: "green",
        color: "white",
        borderRadius: "8px",
        border: "none"
      }}
    >
      Mint Ticket
    </button>
  );
}
