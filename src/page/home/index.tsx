import { Album } from "@components/album/Album"
import { MediaCard } from "@components/media/Media"
import { log } from "@helper/log"
import { usePromise } from "@hook/usePromise"
import { Media } from "@model/Media"
import { View } from "@model/View"
import { useEffect, useState } from "react"
import { Map } from "@model/Map"
import { Stack } from "@mui/material"
import style from "./index.module.scss"
import { Header } from "@components/header/Header"
import { Api } from "@api/emby"
import { Banner } from "@components/banner/Banner"
import { BannerCard } from "@components/banner/BannerCard"

export default function Page() {
    const { data } = usePromise(Api.emby?.getPublicInfo)
    const [albums, setAlbums] = useState<View|null>(null)
    const [medias, setMedias] = useState<Map<string, Media[]>>({})
    useEffect(() => {
        log.info(data)
        if (data) {
            document.title = data.ServerName
        }
    }, [data])
    useEffect(() => {
        Api.emby?.getView?.()
            .then(data => {
                log.info(data)
                setAlbums(data)
            })
    }, [])

    useEffect(() => {
        if (albums?.Items) {
            albums.Items.forEach(item => {
                const id = Number(item.Id)
                Api.emby?.getLatestMedia?.(id)
                    .then(medias => {
                        setMedias(map => ({...map, [item.Name]: medias}))
                    })
            })
        }
    }, [albums])
    
    const media = Object.entries(medias).filter(([key, value]) => value && value.length)[1]?.[1]
    return (
        <div className={style["page"]}>
            {media && <Banner className={style["banner"]} banners={
                media.map(model => <BannerCard key={model.Id} model={model} />)
            } /> }
            <Header />
            <p className={style["title"]}>我的媒体</p>
            <Stack className={style["no-scrollbar"]} direction={"row"} overflow={"scroll"}>
                {albums && albums.Items.map((item, i) => <Album key={`album-${i}`} {...item}/>)}
            </Stack>
            {medias && Object.entries(medias).filter(([key, value]) => value && value.length).map(([name, media]) => (
                <div key={name}>
                <p className={style["title"]}>{name}</p>
                <Stack className={style["no-scrollbar"]} direction={"row"} overflow={"scroll"}>
                    {media && media.map((movie, i) => <MediaCard key={`media-${i}`} {...movie} />)}
                </Stack>
                </div>
            ))}
        </div>
    )
}