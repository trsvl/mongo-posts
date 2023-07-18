import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from "../app/styles/posts.module.scss"
import Post from './Post';
import { useAppSelector } from '../app/hooks';
import EditPost from './EditPost';

interface ItemsI {
  _id: string,
  title: string,
  image: [string],
  description: string,
  author: { firstName: string, lastName: string },
  updatedAt: string,
  length: number,
}

export default function EditPosts() {
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(0);
  const [postsLength, setPostsLength] = useState(0);
  const [posts, setPosts] = useState<ItemsI[]>([]);
  const postsPerLoading = 5;
  const author = useAppSelector(state => state.user.author)

  const getPosts = async () => {

    await axios.get("http://localhost:3080/editpost", {
      params: {
        lim: limit + postsPerLoading,
        author: author,
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
    <div
      style={{ display: loading ? "none" : "flex" }}>
      <div className={style.posts__wrapper}>
        {posts.length > 0 ? posts.map((item) => {
          return (
            <React.Fragment key={item._id}>
              <EditPost isEdit={true} item={item} />
            </React.Fragment>

          )
        })
          : <h1 className='absolute__center'>No posts</h1>
        }
      </div>
    </div>
  )
}
