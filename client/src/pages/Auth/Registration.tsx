import React, { useState } from "react";
import style from "../../app/styles/auth.module.scss";
import axios from "axios";
import Input from "../../app/ui/Input";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { CheckUserTrue, getFirstName, getLastName } from "../../features/userSlice";
import Button from "../../app/ui/Button";

export default function Registration() {

  const [formStates, setFormStates] = useState({
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  })
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const buttonCondition = formStates.firstName && formStates.lastName && formStates.email && formStates.password

  const RegisterHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3080/registration", {
      firstName: formStates.firstName,
      lastName: formStates.lastName,
      email: formStates.email,
      password: formStates.password,
    }, { withCredentials: true }).then((response) => {
      navigate("../posts")
      dispatch(CheckUserTrue())
      dispatch(getFirstName(formStates.firstName))
      dispatch(getLastName(formStates.lastName))
    }
    ).catch((e) => {
      setFormStates((prev) => ({ ...prev, firstNameError: e.response.data.firstName }))
      setFormStates((prev) => ({ ...prev, lastNameError: e.response.data.lastName }))
      setFormStates((prev) => ({ ...prev, emailError: e.response.data.email }))
      setFormStates((prev) => ({ ...prev, passwordError: e.response.data.password }))
    })
  };

  return (
    <form noValidate onSubmit={RegisterHandler} className={style.form}>
      <Input
        type="text"
        name="fname"
        onChange={(e) => setFormStates((prev) => ({ ...prev, firstName: e.target.value }))}
        label="First name"
        errorMessage={formStates.firstNameError}
        onFocus={() => setFormStates((prev) => ({ ...prev, firstNameError: "" }))}
      />
      <Input
        type="text"
        name="lname"
        onChange={(e) => setFormStates((prev) => ({ ...prev, lastName: e.target.value }))}
        label="Last name"
        errorMessage={formStates.lastNameError}
        onFocus={() => setFormStates((prev) => ({ ...prev, lastNameError: "" }))}
      />
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
      <Button condition={buttonCondition} name={"REGISTRATION"} />
    </form>
  );
}

