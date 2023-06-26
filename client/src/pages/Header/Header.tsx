import React from 'react'
import styles from "./../../styles/header.module.scss"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className={styles.header}>
        <nav>
        <Link to={"items"}>
                <h1>Home</h1>
                </Link>
            <div>
                <Link to={"login"}>
                <h1>Login</h1>
                </Link>
                <Link to={"register"}>
                <h1>Register</h1>
                </Link>
              
            </div>
        </nav>
    </header>
  )
}
