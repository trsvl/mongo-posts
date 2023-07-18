import React, {  useState } from 'react'
import style from "../app/styles/posts.module.scss"
import LoadingPosts from '../app/ui/LoadingPosts';

interface ItemsI {
  item: {
    _id: string,
    title: string,
    image: [string],
    description: string,
    author: { firstName: string, lastName: string },
    updatedAt: string,
    length: number,
  }
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
      <div className={item.image.length < 3 && item.image.length > 1 ? style.images__two : item.image.length > 2 ? style.images__three : style.images__one}
      >
      {item.image.map((img,i)=>{
        return(
          <img
          className={style[`img${i}`]}
          key={img}
          src={`http://localhost:3080/uploads/${img}`}
          alt="image"
          onLoad={onLoadHandler}
        />
        )
      })}
      </div>
    
    
      {item.description}
      <h1>{item.author.firstName} {item.author.lastName}</h1>
      <h6>{transformDateHandler(item.updatedAt)}</h6>
    </div>
    </>
  
  )
}
export default Post;