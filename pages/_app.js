import { UserContextProvider } from "../context/userContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </>
  );
}

export default MyApp;
