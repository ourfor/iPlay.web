import { getEpisodes } from "@api/view"
import { useAppSelector } from "@data/StoreHook"
import { usePromise } from "@hook/usePromise"
import { Episode } from "@model/Episode"
import { User } from "@model/User"
import style from "./Episode.module.scss"
import { imageUrl } from "@api/config"
import { Link } from "react-router-dom"

export function EpisodeCard(episode: Episode) {
    return (
        <Link to={`/play/${episode.Id}`}>
        <div className={style["root"]} key={episode.Id}>
            <img src={imageUrl(episode.Id, episode.ImageTags.Primary)} />
            <div>
                <span>{episode.Name}</span>
                <article>{episode.Overview}</article>
            </div>
        </div>
        </Link>
    )
}

export interface EpisodeListProps {
    vid: string
    sid: string
}
export function EpisodeList(props: EpisodeListProps) {
    const user = useAppSelector(state => state.user)
    const {data} = usePromise(() => getEpisodes(user as User, Number(props.vid), Number(props.sid)), [user, props.sid, props.vid])
    if (!data) return null
    return (
        <div>
            {data.map(EpisodeCard)}
        </div>
    )
}