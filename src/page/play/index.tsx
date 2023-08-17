import { getPlaybackInfo } from "@api/play"
import { Spin } from "@components/animation/Spin"
import { useAppSelector } from "@data/StoreHook"
import { log } from "@helper/log"
import { usePromise } from "@hook/usePromise"
import { User } from "@model/User"
import { useLocation } from "react-router-dom"
import style from "./index.module.scss"
import { Player } from "@components/media/Player"

export default function Page() {
    const id = useLocation().pathname.split("/").pop()
    const user = useAppSelector(state => state.user)
    const {loading, data} = usePromise(() => getPlaybackInfo(user as User, Number(id)), [user, id])
    if (loading || !data || !id) return <Spin />
    return (
        <div className={style["page"]}>
            <Player vid={id} model={data} />
        </div>
    )
}