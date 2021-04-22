import React from "react";
import classnames from "classnames/bind";
import css from "./styles.module.scss";

const cx = classnames.bind(css);

function BaseComponent({ className }) {
  return <div className={cx(css.red, className)}>hello</div>;
}

BaseComponent.defaultProps = {};

export default BaseComponent;
