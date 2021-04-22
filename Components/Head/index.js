import React from "react";
import Head from "next/head";

export default function CustomHead() {
  return (
    <div>
      <Head>
        <title>Restorez</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
    </div>
  );
}
