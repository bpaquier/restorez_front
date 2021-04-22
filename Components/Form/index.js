import { Button, TextField, Box } from "@material-ui/core/";
import classnames from "classnames/bind";
import css from "./styles.module.scss";
import { useState } from "react";

export default function FormLogin({ title, handleSubmit, inputs, submitText }) {
  const [values, setValues] = useState({ title });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues((previousState) => {
      previousState[name] = value;

      return { ...previousState };
    });
  };

  return (
    <>
      <div className={css.formContainer}>
        <form
          className={css.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(values);
          }}
        >
          <h2 className={css.titleForm}>{title}</h2>
          {inputs.map(({ label, name, required, type }) => {
            return (
              <div className={css.formGroup}>
                <label className={css.formLabel} htmlFor={name}>
                  {label}
                </label>
                <TextField
                  required={required !== undefined ? required : false}
                  name={name}
                  key={name}
                  id={name}
                  type={type}
                  value={values[name]}
                  onChange={handleChange}
                />
              </div>
            );
          })}

          <Button
            fullWidth={false}
            type="submit"
            variant="contained"
            color="primary"
          >
            {submitText}
          </Button>
        </form>
      </div>
    </>
  );
}
