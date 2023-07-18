import React, { useEffect } from 'react'
import style from "../app/styles/header.module.scss"
import { Link } from "react-router-dom"
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CheckUserFalse, CheckUserTrue, getFirstName, getLastName, getUserId } from '../features/userSlice';

export default function Header() {

  const dispatch = useAppDispatch();
  const checkUser = useAppSelector(state => state.user.checkUser)
  const firstName = useAppSelector(state => state.user.firstName)
  const lastName = useAppSelector(state => state.user.lastName)
  const logoutHandler = () => {
    axios.post("http://localhost:3080/logout", null,
      { withCredentials: true }).catch((e) => {
        console.log(e.message);
      })
    dispatch(CheckUserFalse())
      dispatch(getFirstName(""))
      dispatch(getLastName(""))
  }
  
  useEffect(() => {
    axios.get("http://localhost:3080/profile",
      { withCredentials: true }).then((response) => {
        if (response.status === 200) {
          dispatch(CheckUserTrue())
         dispatch(getUserId(response.data.author))
         dispatch(getFirstName(response.data.firstName))
         dispatch(getLastName(response.data.lastName))
        }
      }
      ).catch((e) => {
        dispatch(CheckUserFalse())
        console.log(e.message);
      })

  }, [])

  useEffect(() => {
    axios.get("http://localhost:3080/profile",
    { withCredentials: true }).then((response) => {
      if (response.status === 200) {
       dispatch(getFirstName(response.data.firstName))
       dispatch(getLastName(response.data.lastName))
       
      }
    }
    ).catch((e) => {
      console.log(e.message);
    })
  }, [firstName, lastName])


  return (
    <header className={style.header}>
      <nav>
        <Link to={"posts"}>
          <h1>Posts</h1>
        </Link>
        {firstName}
        {lastName}
        <div>
          {checkUser &&
            <>
             <Link to={"createpost"}>
                <h1>Create</h1>
              </Link>
              <Link to={"editpost"}>
                <h1>Edit</h1>
              </Link>
              <h1 onClick={logoutHandler}>
                logout
              </h1>
            </>
            }
            {checkUser === false &&
            <>
              <Link to={"login"}>
                <h1>Login</h1>
              </Link>
              <Link to={"registration"}>
                <h1>Registration</h1>
              </Link>
            </>
          }
        </div>
      </nav>
      
    </header>
  )
}
