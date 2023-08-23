import { Spin } from "@components/animation/Spin";
import style from "./index.module.scss"

export const Page = () => {
  return (
    <div className={style.page}>
      <Spin />
    </div>
  )
}
