import React, { useState } from "react";
import styles from "./../../styles/auth.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(response);
    
    if (response.status === 409){
      console.log("that email is existed");
    } 
    if (response.status === 200){
      console.log("all good");
    } 
    
  };

  return (
    <form onSubmit={LoginHandler} className={styles.form}>
      <input
        type="text"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        autoComplete="new-password"
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input className={styles.fake} autoComplete="off" />
      <button>LOG IN</button>
    </form>
  );
}
