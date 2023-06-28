import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getName } from './features/userSlice';
import Header from './pages/Header/Header';
import { Routes, Route } from "react-router-dom"
import Items from './pages/Items/Items';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';

function App() {

  const dispatch = useAppDispatch();
  const name = useAppSelector(state=>state.user.name)
  const [inputValue, setInputValue] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getName(e.target.value))
  }

  return (
    <div>
      <Header/>
      {/* <input type="text" onChange={changeHandler}/>
      <h1>{name}</h1> */}
      <Routes>
      <Route path='items' element={<Items/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='registration' element={<Registration/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
