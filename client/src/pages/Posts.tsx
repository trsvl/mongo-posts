import React, { useEffect, useState } from 'react'
import style from "../app/styles/header.module.scss"
import { Link } from "react-router-dom"
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CheckUserFalse, CheckUserTrue } from '../features/userSlice';

export default function Posts() {

  interface ItemsI {
    _id: string,
    title: string,
    image: String,
    text: string,
  }

  const [posts, setPosts] = useState<Array<ItemsI>>([]);
  // const dispatch = useAppDispatch();
  // const uid = useAppSelector(state => state.user.uid)

  useEffect(() => {
    axios.get("http://localhost:3080/createpost").then((response)=>{
      console.log(response.data)
      setPosts(response.data)
  })
  
    .catch((e) => {
        console.log(e.message);
      })

  }, [])


  return (
    <div>
   {posts.map((item)=>{
    return(
      <div key={item._id}>
        <h1>{item.title}</h1>
        <img src={`http://localhost:3080/uploads/${item.image}`} alt="" />
      </div>
    )
   })}
    </div>
  )
}
