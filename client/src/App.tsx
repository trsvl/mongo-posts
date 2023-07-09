import React, { useState } from 'react';
import { useAppSelector } from './app/hooks';
import Header from './pages/Header';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import CreatePost from './pages/CreatePost';
import Posts from './pages/Posts';

function App() {

  const checkUser = useAppSelector(state => state.user.checkUser)

  return (
    <div>
      <Header />
      <Routes>
      <Route path="/" element={<Navigate to="/posts" replace={true} />}/>
        <Route path='posts' element={<Posts/>} />
        {checkUser
          ? <Route path='createpost' element={<CreatePost />} />

          :
          <>
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
          </>


        }


      </Routes>

    </div>
  );
}

export default App;
