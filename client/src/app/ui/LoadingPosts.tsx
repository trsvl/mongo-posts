import style from "../styles/loading-posts.module.scss"
interface initialI {
  limit: number,
}

export default function LoadingPosts({ limit }: initialI) {

  const arr = new Array(limit).fill("")

  return (
    <div className={style.wrapper}>
      {arr.map((_, i) => {
        return (
          <div key={i} />
        )
      })}
    </div>
  )
}
