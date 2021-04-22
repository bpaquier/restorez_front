import { Button, TextField } from "@material-ui/core/";
import classnames from "classnames/bind";
import css from "./styles.module.scss";
import { useState } from "react";

const cx = classnames.bind(css);

export default function FormLogin({ title, handleSubmit }) {
  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Mot de passe",
      name: "password",
      type: "password",
    },
  ];
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

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
          {inputs.map((input) => {
            return (
              <TextField
                required
                name={input.name}
                key={input.name}
                id={input.name}
                label={input.label}
                type={input.type}
                value={values[input.name]}
                onChange={handleChange}
              />
            );
          })}

          <Button
            fullWidth={false}
            type="submit"
            variant="contained"
            color="primary"
          >
            Se connecter
          </Button>
        </form>
      </div>
    </>
  );
}
