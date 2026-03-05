let usedNumbers = {}; // { wallet: number }

function generateNumber() {
  let num;
  do {
    num = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
  } while (Object.values(usedNumbers).includes(num));
  return num;
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const { wallet } = req.body;

    if (!wallet) {
      return res.status(400).json({ error: "Wallet is required" });
    }

    if (usedNumbers[wallet]) {
      return res.status(200).json({ number: usedNumbers[wallet] });
    }

    const number = generateNumber();
    usedNumbers[wallet] = number;

    return res.status(200).json({ number });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
