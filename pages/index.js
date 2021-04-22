import CustomHead from "../Components/Head/index";
import classnames from "classnames/bind";
import css from "./styles.module.scss";

const cx = classnames.bind(css);

export default function Home() {
  return (
    <>
      <CustomHead />
      <main className={css.pageContainer}></main>
    </>
  );
}
