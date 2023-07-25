import React, { useState } from "react";
import style from "../../app/styles/input.module.scss";
import { ReactComponent as EyeOpen } from "../assets/eye-open.svg";
import { ReactComponent as EyeClose } from "../assets/eye-closed.svg";

interface InputI {
  name: string;
  type: string;
  onFocus?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  label?: string;
  value?: string;
  maxLength?: number;
  autoComplete?: string;
  accept?: string;
}

export default function Input({
  name,
  type,
  onFocus,
  onChange,
  errorMessage,
  label,
  value,
  maxLength,
  autoComplete,
  accept,
}: InputI) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const PasswordVisibleHandler = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className={style.div__input}>
      <input
        className={errorMessage ? style.error__input : ""}
        style={{ paddingRight: name === "password" ? "50px" : "0" }}
        onFocus={onFocus}
        name={name}
        type={
          name !== "password" ? type : passwordVisible ? "text" : "password"
        }
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        required
        multiple={type === "file" ? true : false}
        accept={accept}
      ></input>
      <label>
        {label}
      </label>
      {name === "password" && (
        <div onClick={PasswordVisibleHandler} className={style.password__eye}>
          {passwordVisible ? <EyeOpen /> : <EyeClose />}
        </div>
      )}
      <p className={style.error}>{errorMessage}</p>
    </div>
  );
}
