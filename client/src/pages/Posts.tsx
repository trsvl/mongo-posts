import React, { Suspense, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CheckUserFalse, CheckUserTrue } from '../features/userSlice';
import Loading from '../app/ui/Loading';


export default function Posts() {

  interface ItemsI {
    _id: string,
    title: string,
    image: String,
    text: string,
    author: { firstName: string, lastName: string },
    createdAt: string,
  }

  const [posts, setPosts] = useState<Array<ItemsI>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:3080/createpost").then((response) => {
      console.log(response.data)
      setPosts(response.data)
      setLoading(false)
    })

      .catch((e) => {
        console.log(e.message);
      })

  }, [])

  const transformDateHandler = (dateString:string) => {
    const date = new Date(dateString);

const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
const hours = date.getHours().toString().padStart(2, "0");
const minutes = date.getMinutes().toString().padStart(2, "0");

const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return formattedDate
}


  return (
    <>
      {loading ?
        <Loading />
        :
        posts.length > 0 ? posts.map((item) => {
          return (
            <div key={item._id}>
              <h1>{item.title}</h1>
              <img src={`http://localhost:3080/uploads/${item.image}`} alt="" />
              {item.text}
              <h1>{item.author.firstName} {item.author.lastName}</h1>
              <h6>{transformDateHandler(item.createdAt)}</h6>
            </div>
          )
        })
          : <h1>No posts</h1>
      }

    </>
  )
}
