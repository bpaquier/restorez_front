import CustomHead from "../Components/Head/index";
import classnames from "classnames/bind";
import css from "./styles.module.scss";
import { useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import Router from "next/router";

const cx = classnames.bind(css);

export default function Home() {
  const { user } = useContext(userContext);

  useEffect(() => {
    if (!user) {
      Router.push("/login");
    }

    return () => {};
  }, [user]);

  return (
    user && (
      <>
        <CustomHead />
        <main className={css.pageContainer}>
          <h1>Home page</h1>
          <p>Welcome {user.email}</p>
        </main>
      </>
    )
  );
}
