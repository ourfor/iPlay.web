import { useNavigate } from "react-router-dom"
import style from "./InternalPlayer.module.scss"
import vidstackIcon from "./icon/vidstack.png"

export interface InternalPlayerProps {
    id: string|number
}

export function InternalPlayer({id}: InternalPlayerProps) {
    const navigate = useNavigate()
    return (
        <div className={[style["internal-player"]].join(" ")}>
        <div title="vidstack" className={style["player"]} onClick={() => navigate(`/play/${id}`)}>
            <img alt="vidstack" src={vidstackIcon} />
        </div>
        </div>
    )
}