import style from "./ExternalPlayer.module.scss"
import iinaIcon from "./icon/iina.png"
import nplayerIcon from "./icon/nplayer.png"
import infuseIcon from "./icon/infuse.png"
import vlcIcon from "./icon/vlc.png"
import potplayerIcon from "./icon/potplayer.png"
import kmplayerIcon from "./icon/kmplayer.png"
import mxplayerIcon from "./icon/mxplayer.png"
import mxplayerProIcon from "./icon/mxplayerpro.png"

export interface ExternalPlayerProps {
    className?: string
    src: string
}

const players = {
    iina: {
        title: "iina",
        icon: iinaIcon,
        action: (url: string) => {
            window.open(`iina://weblink?url=${encodeURI(url)}`)
        }
    },
    nplayer: {
        title: "nPlayer",
        icon: nplayerIcon,
        action: (url: string) => {
            window.open(`nplayer-${encodeURI(url)}`)
        }
    },
    vlc: {
        title: "VLC",
        icon: vlcIcon,
        action: (url: string) => {
            window.open(`vlc://${encodeURI(url)}`)
        }
    },
    infuse: {
        title: "Infuse",
        icon: infuseIcon,
        // infuse://x-callback-url/play?url=
        action: (url: string) => {
            window.open(`infuse://x-callback-url/play?url=${encodeURI(url)}`)
        }
    },
    portplayer: {
        title: "PortPlayer",
        icon: potplayerIcon,
        action: (url: string) => {
            window.open(`portplayer://${encodeURI(url)}`)
        }
    },
    kmplayer: {
        title: "KMPlayer",
        icon: kmplayerIcon,
        action: (url: string) => {
            window.open(`kmplayer://${encodeURI(url)}`)
        }
    },
    mxplayer: {
        title: "MXPlayer",
        icon: mxplayerIcon,
        action: (url: string) => {
            const title = new URL(url).pathname
            window.open(`intent:${encodeURI(url)}#Intent;package=com.mxtech.videoplayer.ad;S.title=${title};end`)
        }
    },
    mxplayerpro: {
        title: "MXPlayer Pro",
        icon: mxplayerProIcon,
        action: (url: string) => {
            const title = new URL(url).pathname
            window.open(`intent:${encodeURI(url)}#Intent;package=com.mxtech.videoplayer.pro;S.title=${title};end`)
        }
    }
}

export function ExternalPlayer({ src, className }: ExternalPlayerProps) {
    return (
        <div className={[style["external-player"], className].join(" ")}>
        {Object.entries(players).map(([name, item]) => (
            <div title={item.title} className={style["player"]} key={name} 
                onClick={() => item.action(src)}>
                <img alt={item.title} src={item.icon} />
            </div>
        ))}
        </div>
    )
}