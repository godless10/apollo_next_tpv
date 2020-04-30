import "cross-fetch/polyfill";

import React from "react";
import Head from "next/head";

/////////////////////////////////ANTD
import "antd/dist/antd.css";
import "../components/layout/extraCSS.css";
/////////////////////////////////REDUX
import { Provider } from "react-redux";
import generateStore from "../redux/store";

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={generateStore()}>
      <Head>
        <title>TPV Web</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
