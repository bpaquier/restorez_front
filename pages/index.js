import React from "react";
import BaseComponent from "../Components/@BaseComponent";
import classnames from "classnames/bind";
import css from "./styles.module.scss";
const cx = classnames.bind(css);

export default function Home() {
  return (
    <div>
      <BaseComponent className={css.green} />
    </div>
  );
}
