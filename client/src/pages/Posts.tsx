import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CheckUserFalse, CheckUserTrue } from '../features/userSlice';
import Loading from '../app/ui/Loading';
import PostsArr from './Post';
import LoadingPosts from '../app/ui/LoadingPosts';
import style from "../app/styles/posts.module.scss"
import Post from './Post';

interface ItemsI {
  _id: string,
  title: string,
  image: String,
  text: string,
  author: { firstName: string, lastName: string },
  createdAt: string,
  length: number,
}

export default function Posts() {

  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(0);
  const [postsLength, setPostsLength] = useState(0);
  const [posts, setPosts] = useState<ItemsI[]>([]);
  const postsPerLoading = 5;

  const getPosts = async () => {

    await axios.get("http://localhost:3080/createpost", {
      params: {
        lim: limit + postsPerLoading,
      },
    }).then((response) => {
      setPostsLength(response.data.postsLength)
      setPostsLength(response.data.postsLength)
      setLimit((prev) => prev + postsPerLoading);

      setLoading(false);
      setPosts(response.data.posts)
    })
      .catch((e) => {
        console.log(e.message);
      })
  }


  useEffect(() => {

    getPosts();
  }, [])

  useEffect(() => {
    let timeoutId: any;

    const handleScroll = () => {

      clearTimeout(timeoutId);
      const a = document.documentElement.scrollTop;
      const b = document.documentElement.scrollHeight;
      const c = document.documentElement.clientHeight;

      timeoutId = setTimeout(() => {


        if ((a / (b - c)) * 100 > 60 && !(postsLength <= limit)) {

          getPosts();
        }
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)

    };
  }, [postsLength, limit]);


  return (


    <div className={style.page__wrapper}
      style={{ display: loading ? "none" : "flex" }}>
      <div className={style.posts__wrapper}>
        {posts.length > 0 ? posts.map((item) => {
          return (
            <React.Fragment key={item._id}>
              <Post postsPerLoading={postsPerLoading} item={item} />
            </React.Fragment>

          )
        })
          : <h1 className='absolute__center'>No posts</h1>
        }

      </div>
    </div>
  )
}
