import { useNavigate } from "react-router-dom"
import style from "./InternalPlayer.module.scss"

export interface InternalPlayerProps {
    id: string|number
}

export function InternalPlayer({id}: InternalPlayerProps) {
    const navigate = useNavigate()
    return (
        <div className={style["player"]} onClick={() => navigate(`/play/${id}`)}>
            <img src={"https://www.vidstack.io/favicon.ico"} />
        </div>
    )
}