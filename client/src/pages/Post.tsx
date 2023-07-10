import React, {  useState } from 'react'
import style from "../app/styles/posts.module.scss"
import LoadingPosts from '../app/ui/LoadingPosts';

interface ItemsI {
  item: {
    _id: string,
    title: string,
    image: String,
    text: string,
    author: { firstName: string, lastName: string },
    createdAt: string,
    length: number,
  },
  postsPerLoading: number,
}

const Post: React.FC<ItemsI> = ({ item }) => {

  const [loading, setLoading] = useState(true);

  const transformDateHandler = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

    return formattedDate
  }

  const onLoadHandler = () => {
    setLoading(false)
  }


  return (
    <>
        {loading &&   <LoadingPosts limit={1} />}
      <div className={style.post__wrapper} key={item._id}
      style={{ display: loading ? "none" : "block" }}>
      <h1>{item.title}</h1>
      <img
        src={`http://localhost:3080/uploads/${item.image}`}
        alt="image"
        onLoad={onLoadHandler}
      />
      {item.text}
      <h1>{item.author.firstName} {item.author.lastName}</h1>
      <h6>{transformDateHandler(item.createdAt)}</h6>
    </div>
    </>
  
  )
}
export default Post;