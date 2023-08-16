import { imageUrl, playUrl } from "@api/config"
import { playbackInfo } from "@api/play"
import { Spin } from "@components/animation/Spin"
import { useAppSelector } from "@data/StoreHook"
import { log } from "@helper/log"
import { usePromise } from "@hook/usePromise"
import { User } from "@model/User"
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { useLocation } from "react-router-dom"
import style from "./index.module.scss"

export default function Page() {
    const id = useLocation().pathname.split("/").pop()
    const user = useAppSelector(state => state.user)
    const {loading, data} = usePromise(() => playbackInfo(user as User, Number(id)), [user, id])
    log.info(data)
    if (!data) return <Spin />
    const source: Plyr.SourceInfo = {
        type: "video",
        sources: data.MediaSources.map(item => ({
            src: playUrl(item.DirectStreamUrl),
            title: item.Name,
        })),
        poster: imageUrl(id ?? "", {maxWidth: 1920, maxHeight: 1080})
        // sources: []
    }
    const options: Plyr.Options = {
        autoplay: true
    }
    return (
        <div className={style["page"]}>
            <Plyr source={source} options={options} />
        </div>
    )
}