import axios from "axios";
import CustomHead from "../../Components/Head/index";
import classnames from "classnames/bind";
import css from "../styles.module.scss";
import FormLogin from "../../Components/FormLogin";
import { useRouter } from "next/router";
import { API_URL } from "../../config";

export default function Signin() {
  const router = useRouter();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const response = await axios.post(`${API_URL}/restaurateurs`, {
        email,
        password,
      });

      if (response.data.status == 200) {
        router.push("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <CustomHead />
      <main className={css.pageContainer}>
        <FormLogin
          title={"Nouvel utilisateur"}
          handleSubmit={handleSubmit}
          textSubmit={"Créer un compte"}
        ></FormLogin>
      </main>
    </>
  );
}
