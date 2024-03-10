import style from "./ExternalPlayer.module.scss"
import iinaIcon from "./icon/iina.png"
import nplayerIcon from "./icon/nplayer.png"

export interface ExternalPlayerProps {
    src: string
}

const players = {
    iina: {
        icon: iinaIcon,
        action: (url: string) => {
            window.open(`iina://weblink?url=${encodeURI(url)}`)
        }
    },
    nplayer: {
        icon: nplayerIcon,
        action: (url: string) => {
            window.open(`nplayer-${encodeURI(url)}`)
        }
    }
}

export function ExternalPlayer({ src }: ExternalPlayerProps) {
    return (
        <div className={style["external-player"]}>
        {Object.entries(players).map(([name, item]) => (
            <div className={style["player"]} key={name} 
                onClick={() => item.action(src)}>
                <img src={item.icon} />
            </div>
        ))}
        </div>
    )
}