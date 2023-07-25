import React, { useEffect, ReactElement , useRef, useState } from 'react'
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
  },
  isEdit?: boolean,
  editDiv?: ReactElement ,
}

interface OverflowObjI {
  isOverflowTitle: boolean,
  cursorPointerTitle: boolean,
  isOverflowDescription: boolean,
  cursorPointerDescription: boolean,
}

const Post: React.FC<ItemsI> = ({ item, isEdit, editDiv }) => {

  const [loading, setLoading] = useState(true);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const formattedDescription = item.description.replace(/\n/g, '<br>');
  const [overFlowObj, setOverflowObj] = useState<OverflowObjI>({
    isOverflowTitle: false,
    cursorPointerTitle: false,
    isOverflowDescription: false,
    cursorPointerDescription: false,
  })

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

  useEffect(() => {
    const handleResize = () => {
      const element = titleRef.current;
      if (element) {
        setOverflowObj((prev: any) => ({ ...prev, isOverflowTitle: element.scrollHeight > element.clientHeight }))
        setOverflowObj((prev: any) => ({ ...prev, cursorPointerTitle: element.scrollHeight > element.clientHeight }))
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [loading]);

  useEffect(() => {
    const handleResize = () => {
      const element = descriptionRef.current;
      if (element) {
        setOverflowObj((prev: any) => ({ ...prev, isOverflowDescription: element.scrollHeight > element.clientHeight }))
        setOverflowObj((prev: any) => ({ ...prev, cursorPointerDescription: element.scrollHeight > element.clientHeight }))
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [loading]);

  useEffect(() => {
    (item.image.length < 1) && setLoading(false)
  }, [])


  return (
    <>
      {loading && item.image.length > 0 && <LoadingPosts limit={1} />}
      <div className={style.post__wrapper} key={item._id}
        style={{ display: loading ? "none" : "block" }}>
          {!isEdit
          ?   <div className={style.author}>
          <p>{item.author.firstName} {item.author.lastName}</p>
          <p>{transformDateHandler(item.updatedAt)}</p>
        </div>
          : 
          <div className={style.author__edit}>
             <p>{item.author.firstName} {item.author.lastName}</p>
          <p>{transformDateHandler(item.updatedAt)}</p>
            {editDiv}
            </div>
          
        
          }
      

        <h1 style={{
          display: overFlowObj.isOverflowTitle ? "-webkit-box" : overFlowObj.cursorPointerTitle ? "block" : "-webkit-box",
          cursor: overFlowObj.cursorPointerTitle ? "pointer" : "default"
        }}
          onClick={() => setOverflowObj((prev: any) => ({ ...prev, isOverflowTitle: !prev.isOverflowTitle }))}
          className={style.title} ref={titleRef}>{item.title}  </h1>

        {overFlowObj.cursorPointerTitle && overFlowObj.isOverflowTitle && <p onClick={() => setOverflowObj((prev: any) => ({ ...prev, isOverflowTitle: !prev.isOverflowTitle }))} className={style.overflow__message}>[show]</p>}
        {overFlowObj.cursorPointerTitle && !overFlowObj.isOverflowTitle && <p onClick={() => setOverflowObj((prev: any) => ({ ...prev, isOverflowTitle: !prev.isOverflowTitle }))} className={style.overflow__message}>[hide]</p>}
        {
          item.image.length > 0 ?
            <div className={item.image.length < 3 && item.image.length > 1 ? style.images__two : item.image.length > 2 ? style.images__three : style.images__one}
            >
              {item.image.map((img, i) => {
                return (
                  <img
                    className={style[`img${i}`]}
                    key={img}
                    src={`http://localhost:3080/uploads/${img}`}
                    alt="image"
                    onLoad={onLoadHandler}
                    draggable={false}
                  />
                )
              })
              }
            </div>
            : null
        }
        <p style={{
          display: overFlowObj.isOverflowDescription ? "-webkit-box" : overFlowObj.cursorPointerDescription ? "block" : "-webkit-box",
          cursor: overFlowObj.cursorPointerDescription ? "pointer" : "default"
        }}
          onClick={() => setOverflowObj((prev: any) => ({ ...prev, isOverflowDescription: !prev.isOverflowDescription }))}
          className={style.description} ref={descriptionRef} dangerouslySetInnerHTML={{ __html: formattedDescription }}></p>
        {overFlowObj.cursorPointerDescription && overFlowObj.isOverflowDescription && <p onClick={() => setOverflowObj((prev: any) => ({ ...prev, isOverflowDescription: !prev.isOverflowDescription }))} className={style.overflow__message}>[show]</p>}
        {overFlowObj.cursorPointerDescription && !overFlowObj.isOverflowDescription && <p onClick={() => setOverflowObj((prev: any) => ({ ...prev, isOverflowDescription: !prev.isOverflowDescription }))} className={style.overflow__message}>[hide]</p>}
      </div>
    </>
  )
}
export default Post;