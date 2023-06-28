import React, { useState } from "react";
import style from "../../app/styles/auth.module.scss";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const LoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3080/login", {
        email,
        password,
    }).catch((e)=>{
      console.log(e.response.data);
      setEmailError(e.response.data.email)
      setPasswordError(e.response.data.password)
    })
  
    
  
    
  };

  return (
    <form onSubmit={LoginHandler} className={style.form}>
      <input
        type="text"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <span>{emailError}</span>
      <input
        autoComplete="new-password"
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
          <span>{passwordError}</span>
      <input className={style.fake} autoComplete="off" />
      <button>LOG IN</button>
    </form>
  );
}
