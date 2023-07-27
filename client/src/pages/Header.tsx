import { useEffect, useRef, useState } from 'react'
import style from "../app/styles/header.module.scss"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CheckUserFalse, CheckUserTrue, getFirstName, getLastName, getUserId } from '../features/userSlice';
import arrowBottom from './../app/assets/arrow-bottom.svg';
import arrowTop from './../app/assets/arrow-top.svg';

export default function Header() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const checkUser = useAppSelector(state => state.user.checkUser)
  const firstName = useAppSelector(state => state.user.firstName)
  const lastName = useAppSelector(state => state.user.lastName)
  const [arrowState, setArrowState] = useState(false)
  const refName = useRef<HTMLDivElement>(null);

  const logoutHandler = () => {
    axios.post("https://mongo-posts-api.onrender.com/logout", null,
      { withCredentials: true }).then(() => navigate("/login")).catch((e) => {
        console.log(e.message);
      })
    dispatch(CheckUserFalse())
    dispatch(getFirstName(""))
    dispatch(getLastName(""))
  }

  useEffect(() => {
    axios.get("https://mongo-posts-api.onrender.com/profile",
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
  }, [checkUser, firstName, lastName])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (refName.current && !refName.current.contains(e.target as Node)) {
      setArrowState(false);
    }
  };

  return (
    <header className={style.header}>
      <nav>
        <Link to={"posts"}>
          <h1>Posts</h1>
        </Link>
        <div>
          {checkUser &&
            <div ref={refName} className={style.name} onClick={() => setArrowState((prev: boolean) => !prev)}>
              <p>{firstName} {lastName}</p>
              {arrowState ? <img src={arrowTop} alt="arrow top" /> : <img src={arrowBottom} alt="arrow bottom" />}
              {arrowState &&
                <div className={style.list}>
                  <Link to={"createpost"}>
                    <p>Create post</p>
                  </Link>
                  <Link to={"editpost"}>
                    <p>Edit post</p>
                  </Link>
                  <p onClick={logoutHandler}>
                    logout
                  </p>
                </div>}
            </div>
          }
          {checkUser === false &&
            <div className={style.auth}>
              <Link to={"login"}>
                <p>Login</p>
              </Link>
              <Link to={"registration"}>
                <p>Registration</p>
              </Link>
            </div>
          }
        </div>
      </nav>
    </header>
  )
}
