import React, { useState, ChangeEvent, FormEvent} from "react";
import * as Yup from "yup";

import styles from "../styles/Main.module.css";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  room: Yup.string().required("Room is required"),
});

const FIELDS = {
  USERNAME: "username",
  ROOM: "room",
};

export const Main = () => {
  const { USERNAME, ROOM } = FIELDS;
  const [values, setValues] = useState<{
    [x: string]: string;
  }>({ [USERNAME]: "", [ROOM]: "" });

  const [errors, setErrors] = useState<{
    [x: string]: string;
  }>({
    [USERNAME]: "",
    [ROOM]: "",
  });

  const handleChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validationSchema
      .validate(values, { abortEarly: false }) // Validate the form values
      .then(() => {
        // Valid form, navigate to the chat page
        window.location.href = `/chat?name=${values.username}&room=${values.room}`;
      })
      .catch((validationErrors:Yup.ValidationError) => {
        // Invalid form, update the errors state
        const newErrors:{ [key: string]: string } = {};
        (validationErrors.inner as Yup.ValidationError[]).forEach((error) => {
          if (error.path)
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>
        <form className={styles.form} onSubmit={handleClick}>
          <div className={styles.group}>
            <input
              type="text"
              name="username"
              value={values[USERNAME]}
              className={styles.input}
              autoComplete="off"
              placeholder="Username"
              required
              onChange={handleChange}
            />
            {errors[USERNAME] && <div className={styles.error}>{errors[USERNAME]}</div>}
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="room"
              value={values[ROOM]}
              className={styles.input}
              autoComplete="off"
              placeholder="room"
              required
              onChange={handleChange}
            />
             {errors[ROOM] && <div className={styles.error}>{errors[ROOM]}</div>}
          </div>
         
            <button  className={styles.button} type="submit">
              Sign In
            </button>
      
        </form>
      </div>
    </div>
  );
};
