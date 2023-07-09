import React, { useState } from "react";
import style from "../../app/styles/auth.module.scss";
import axios from "axios";
import Input from "../../app/ui/Input";
import { useAppDispatch } from "../../app/hooks";
import { CheckUserTrue, getFirstName, getLastName } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formStates, setFormStates] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  })
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const LoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStates((prev) => ({ ...prev, emailError: "" }))
    setFormStates((prev) => ({ ...prev, passwordError: "" }))
    await axios.post("http://localhost:3080/login", {
      email: formStates.email,
      password: formStates.password,
    }, { withCredentials: true }).then((response) => {
      console.log(response)
      dispatch(CheckUserTrue())
      dispatch(getFirstName(response.data.firstName))
      dispatch(getLastName(response.data.lastName))
      navigate("../posts")
    }
    ).catch((e) => {
      console.log(e.response.data);
      setFormStates((prev) => ({ ...prev, emailError: e.response.data.email }))
      setFormStates((prev) => ({ ...prev, passwordError: e.response.data.password }))
    })


  };

  return (
    <form noValidate onSubmit={LoginHandler} className={style.form}>
      <Input
        type="text"
        name="email"
        onChange={(e) => setFormStates((prev) => ({ ...prev, email: e.target.value }))}
        label="Email"
        errorMessage={formStates.emailError}
        onFocus={() => setFormStates((prev) => ({ ...prev, emailError: "" }))}
      />
      <Input
        autoComplete="new-password"
        name="password"
        type="password"
        label="Password"
        onChange={(e) => setFormStates((prev) => ({ ...prev, password: e.target.value }))}
        errorMessage={formStates.passwordError}
        onFocus={() => setFormStates((prev) => ({ ...prev, passwordError: "" }))}
      />
      <input className={style.fake} />
      <button>LOG IN</button>
    </form>
  );
}
