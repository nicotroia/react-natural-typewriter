import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="index,follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="https://nicotroia.com/" rel="author" />
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
