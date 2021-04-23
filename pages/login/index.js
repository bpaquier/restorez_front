import axios from "axios";
import { useContext } from "react";

import CustomHead from "../../Components/Head/index";
import css from "./styles.module.scss";
import FormLogin from "../../Components/FormLogin";
import Button from "@material-ui/core/Button";
import { userContext } from "../../context/userContext";
import { useRouter } from "next/router";

export default function Login() {
  const { user, setUser } = useContext(userContext);
  const router = useRouter();

  const handleSumbit = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post("http://localhost:5000/auth", {
        email,
        password,
      });

      const { user, accessToken } = response.data.data;

      if (response.data.status === 200) {
        setUser({
          ...user,
          accessToken,
        });
        router.push("/");
      }
    } catch (e) {}
  };
  const goMainPage = () => {
    router.push("/");
  };
  console.log(user);
  return (
    <>
      <CustomHead />
      <main className={css.pageContainer}>
        {!user || Object.keys(user).length === 0 ? (
          <FormLogin title={"Connexion"} handleSubmit={handleSumbit} />
        ) : (
          <div className={css.alreadyLogContainer}>
            <p className={css.alreadyLogButton}>Vous êtes déjà connecté</p>
            <Button
              onClick={goMainPage}
              variant="contained"
              href={`/`}
              color="primary"
            >
              Liste des restaurants
            </Button>
          </div>
        )}
      </main>
    </>
  );
}
