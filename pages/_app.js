import { UserContextProvider } from "../context/userContext";
import "../styles/globals.scss";
import CustomHead from "../Components/Head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CustomHead />
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </>
  );
}

export default MyApp;
