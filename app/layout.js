export const metadata = {
  title: "Stacks March Lottery",
  description: "Lottery on Stacks blockchain",
  other: {
    "talentapp:project_verification":
      "46eb454e1db771cea6ca98759164863b4bad221b308752ca9dd5e788e964bfd2c9d9bcb8297f24e00cbc99502c4f3f98017d7b4e45da414c22613d997604eb93",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
