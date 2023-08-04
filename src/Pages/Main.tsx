import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/Main.module.css";

const FIELDS = {
  USERNAME: "username",
  ROOM: "room",
};

export const Main = () => {
  const { USERNAME, ROOM } = FIELDS;
  const [values, setValues] = useState<{
    [x: string]: string;
  }>({ [USERNAME]: "", [ROOM]: "" });

  const handleChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
    };

    const handleClick = (e:MouseEvent<HTMLAnchorElement>) => {
        // const isDisabled = Object.values(values).some(value => !value);
      const isDisabled = !values.username || !values.room;
        if (isDisabled)  e.preventDefault() 
    }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>
        <form className={styles.form}>
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
          </div>
          <Link onClick={handleClick} className={styles.group} to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}>
            <button className={styles.button} type="submit">
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
