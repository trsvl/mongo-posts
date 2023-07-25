import style from "../styles/button.module.scss"
interface ButtonI {
  condition: boolean | string,
  name: string,
}

export default function Button({ condition, name }: ButtonI) {
  return (
    <button
      className={condition ? style.btn__on : style.btn__off}
      disabled={condition ? false : true}>{name}</button>
  )
}
