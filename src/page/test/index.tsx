import { useEffect } from "react"
import style from "./index.module.scss"
import { Spin } from "@components/animation/Spin"

export default function Page() {
    return (
        <div className={style.page}>
            <Spin />
        </div>
    )
}