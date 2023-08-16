import { publicInfo } from "@api/info"
import { latestMedia, viewByUser } from "@api/view"
import { Album } from "@components/album/Album"
import { MediaCard } from "@components/media/Media"
import { useAppSelector } from "@data/StoreHook"
import { log } from "@helper/log"
import { usePromise } from "@hook/usePromise"
import { Media } from "@model/Media"
import { User } from "@model/User"
import { View } from "@model/View"
import { useEffect, useState } from "react"
import { Map } from "@model/Map"
import { Stack } from "@mui/material"
import style from "./index.module.scss"
import { Header } from "@components/header/Header"

export default function Page() {
    const {data} = usePromise(publicInfo)
    const [albums, setAlbums] = useState<View|null>(null)
    const [medias, setMedias] = useState<Map<string, Media[]>>({})
    const user = useAppSelector(state => state.user)
    useEffect(() => {
        log.info(data)
        if (data) {
            document.title = data.ServerName
        }
    }, [data])
    useEffect(() => {
        viewByUser(user as User)
            .then(data => {
                log.info(data)
                setAlbums(data)
            })
    }, [user])

    useEffect(() => {
        if (albums?.Items) {
            albums.Items.forEach(item => {
                const id = item.Id
                latestMedia(user as User, Number(id))
                    .then(medias => {
                        setMedias(map => ({...map, [item.Name]: medias}))
                    })
            })
        }
    }, [albums])
    return (
        <div className={style["page"]}>
            <Header />
            <p className={style["title"]}>我的媒体</p>
            <Stack className={style["no-scrollbar"]} direction={"row"} overflow={"scroll"}>
                {albums && albums.Items.map((item, i) => <Album key={`album-${i}`} {...item}/>)}
            </Stack>
            {medias && Object.entries(medias).filter(([key, value]) => value && value.length).map(([name, media]) => (
                <>
                <p className={style["title"]}>{name}</p>
                <Stack className={style["no-scrollbar"]} direction={"row"} overflow={"scroll"}>
                    {media && media.map(movie => <MediaCard {...movie} />)}
                </Stack>
                </>
            ))}
        </div>
    )
}