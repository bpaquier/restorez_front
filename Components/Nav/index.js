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

  const signOut = (e) => {
    e.preventDefault()
    setUser({});
    router.push('/login')
  };
  return (
    <header className={css.nav}>
      <a href="/">
        <img className={css.navLogo} src={'/logo.png'} />
      </a>
      {user && Object.keys(user).length > 0 ? (
        <div className={css.navContent}>
          <div className={css.navUser}>
            <AccountCircleIcon className={css.navUserIcon} />
            <p className={css.navText}>{user?.email}</p>
          </div>
          <a onClick={signOut} className={css.navLink}>Se déconnecter</a>
        </div>
      ) : (
        <div className ={css.navContent}>
          <p className={css.navText}>Bienvenue sur Restorez</p>
          <a className={css.navLink} href='/signin'>Créer un compte</a>
        </div>
      )}
    </header>
  );
}
