import { Button, TextField, Box } from "@material-ui/core/";
import css from "./styles.module.scss";
import { useState, useEffect } from "react";

const getInitialState = (inputs) => {
  const res = {};
  inputs.forEach((input) => {
    res[input.name] = "";
  });

  return res;
};
export default function FormLogin({ title, handleSubmit, inputs, submitText }) {
  const [values, setValues] = useState(getInitialState(inputs));

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues((previousState) => {
      previousState[name] = value;

      return { ...previousState };
    });
  };

  useEffect(() => {
    console.log(values);
    return () => {};
  }, [values]);

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
          {inputs.map(({ label, name, required, type, id }) => {
            return (
              <div className={css.formGroup}>
                <label className={css.formLabel} htmlFor={name}>
                  {label}
                </label>
                <TextField
                  required={required !== undefined ? required : false}
                  name={name}
                  key={id}
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
