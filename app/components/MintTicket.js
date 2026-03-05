"use client";

import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";

const network = new StacksMainnet();

export default function MintTicket() {

  const mint = async () => {

    const txOptions = {
      contractAddress: "TU_CONTRACT_ADDRESS",
      contractName: "TU_CONTRACT_NAME",
      functionName: "mint",
      functionArgs: [],
      network,
      appDetails: {
        name: "Stacks Lottery",
      },
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
