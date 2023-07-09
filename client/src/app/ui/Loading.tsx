import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import "../styles/loading.scss"
interface initialI {
    time?: number,
}

export default function Loading({time}:initialI) {


  return (
    <div className="lds__ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
  )
}
