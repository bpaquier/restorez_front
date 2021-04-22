import axios from "axios";
import CustomHead from "../../Components/Head/index";
import classnames from "classnames/bind";
import css from "../styles.module.scss";
import FormLogin from "../../Components/FormLogin";

const cx = classnames.bind(css);

export default function Login() {
  const handleSumbit = async (values) => {
    const { email, password } = values;

    try {
      const reponse = await axios.post("http://localhost:5000/auth", {
        email,
        password,
      });

      console.log(reponse.data.data.accessToken);
    } catch (e) {}
  };
  return (
    <>
      <CustomHead />
      <main className={css.pageContainer}>
        <FormLogin title={'Connexion'} handleSubmit={handleSumbit} />
      </main>
    </>
  );
}
