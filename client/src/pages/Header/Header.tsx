import React from 'react'
import style from "../../app/styles/header.module.scss"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className={style.header}>
        <nav>
        <Link to={"items"}>
                <h1>Home</h1>
                </Link>
            <div>
                <Link to={"login"}>
                <h1>Login</h1>
                </Link>
                <Link to={"registration"}>
                <h1>Registration</h1>
                </Link>
              
            </div>
        </nav>
    </header>
  )
}
