import { getEpisodes } from "@api/view"
import { useAppSelector } from "@data/StoreHook"
import { usePromise } from "@hook/usePromise"
import { Episode } from "@model/Episode"
import { User } from "@model/User"
import style from "./Episode.module.scss"
import { imageUrl } from "@api/config"
import { useNavigate } from "react-router-dom"

export function EpisodeCard(episode: Episode) {
    const navigate = useNavigate()
    return (
        <div className={style["root"]} 
            key={episode.Id}
            onClick={() => navigate(`/play/${episode.Id}`)}
            >
            <img src={imageUrl(episode.Id, episode.ImageTags.Primary)} />
            <div>
                <span>{episode.Name}</span>
                <article>{episode.Overview}</article>
            </div>
        </div>
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
            {data.map(episode => <EpisodeCard {...episode} />)}
        </div>
    )
}