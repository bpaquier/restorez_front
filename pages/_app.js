import { UserContextProvider } from "../context/userContext";
import "../styles/globals.scss";
import CustomHead from "../Components/Head";
import Nav from "../Components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CustomHead />
      <UserContextProvider>
        <Nav />
        <Component {...pageProps} />
      </UserContextProvider>
    </>
  );
}

export default MyApp;
