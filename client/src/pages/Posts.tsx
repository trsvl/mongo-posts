import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from "../app/styles/posts.module.scss"
import Post from './Post';

interface ItemsI {
  _id: string,
  title: string,
  image: [string],
  description: string,
  author: { firstName: string, lastName: string },
  updatedAt: string,
  length: number,
}

export default function Posts() {
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(0);
  const [postsLength, setPostsLength] = useState(0);
  const [posts, setPosts] = useState<ItemsI[]>([]);
  const postsPerLoading = 5;

  const getPosts = async () => {
    await axios.get("https://mongo-posts.onrender.com/createpost", {
      params: {
        lim: limit + postsPerLoading,
      },
    }).then((response) => {
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
    let timeoutId: NodeJS.Timeout;
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

    <div className={style.posts__wrapper}
      style={{ display: loading ? "none" : "flex" }}>
      {posts.length > 0 ? posts.map((item) => {
        return (
          <React.Fragment key={item._id}>
            <Post item={item} />
          </React.Fragment>
        )
      })
        : <h1 className='absolute__center'>No posts</h1>
      }
    </div>
  )
}
