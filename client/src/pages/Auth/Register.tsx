import React from "react";
import styles from "./../../styles/auth.module.scss";

export default function Register() {
  const RegisterHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={RegisterHandler} className={styles.form}>
      <input type="text" name="email" title="login" />
      <input
        autoComplete="new-password"
        name="password"
        type="password"
        title="password"
      />
      <input
        autoComplete="off"
        name="password"
        type="password"
        title="confirm password"
      />
      <button>Register</button>
    </form>
  );
}
