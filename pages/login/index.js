import axios from "axios";
import { useContext } from "react";

import CustomHead from "../../Components/Head/index";
import css from "../styles.module.scss";
import FormLogin from "../../Components/FormLogin";
import { userContext } from "../../context/userContext";
import { useRouter } from "next/router";

export default function Login() {
  const { setUser } = useContext(userContext);
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
  return (
    <>
      <CustomHead />
      <main className={css.pageContainer}>
        <FormLogin handleSubmit={handleSumbit} />
      </main>
    </>
  );
}
