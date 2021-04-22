import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";

import classnames from "classnames/bind";
import css from "./styles.module.scss";
import { userContext } from "../../context/userContext";
import { useContext } from "react";
import { useRouter } from "next/router"

export default function Nav() {
  const { user, setUser } = useContext(userContext);
  const router = useRouter();

  const signOut = () => {
    setUser({});
    router.push('/login')
  };
  return (
    <header className={css.nav}>
      {user && Object.keys(user).length > 0 ? (
        <div className={css.navContent}>
          <div className={css.navContentLeft}>
            <AccountCircleIcon fontSize="2rem" />
          </div>
          <div className={css.navContentRight}>
            <p className={css.navText}>{user?.email}</p>
            <Button
              onClick={signOut}
              size="small"
              variant="contained"
              color="default"
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      ) : (
        <p>Bienvenue sur Restorez</p>
      )}
    </header>
  );
}
