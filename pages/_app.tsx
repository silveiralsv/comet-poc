import "../app/globals.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {

    console.log('here')
  return <Component {...pageProps} />;
}

export default App;
