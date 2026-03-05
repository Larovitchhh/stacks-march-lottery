// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Stacks March Lottery</title>
        <meta
          name="description"
          content="Participa en la Stacks March Lottery, mintea tu ticket y recibe un número aleatorio 000-999"
        />
        <meta
          name="talentapp:project_verification"
          content="46eb454e1db771cea6ca98759164863b4bad221b308752ca9dd5e788e964bfd2c9d9bcb8297f24e00cbc99502c4f3f98017d7b4e45da414c22613d997604eb93"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
