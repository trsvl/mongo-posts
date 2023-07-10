import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import style from "../styles/loading-posts.module.scss"
interface initialI {
    limit: number,
}

export default function LoadingPosts({limit}:initialI) {

  const arr = new Array(limit).fill("")
  const img = require("../assets/skeleton.png")
  
  return (
    <div className={style.wrapper}>
       {arr.map((_,i)=>{
        return(
          <img key={i} src={img}/>
        )
       })}
        </div>
  )
}
