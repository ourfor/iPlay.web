import { Album } from "@components/album/Album"
import { MediaCard } from "@components/media/Media"
import { log } from "@helper/log"
import { usePromise } from "@hook/usePromise"
import { Media } from "@model/Media"
import { useEffect, useState } from "react"
import { Map } from "@model/Map"
import style from "./index.module.scss"
import { Header } from "@components/header/Header"
import { Api } from "@api/emby"
import { Banner } from "@components/banner/Banner"
import { BannerCard } from "@components/banner/BannerCard"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { Stack } from "@components/layout/Stack"

export async function pageLoader({params}: LoaderFunctionArgs) {
    const albums = await Api.emby?.getView?.()
    return {
        albums
    }
}

export default function Page() {
    const { albums } = useLoaderData() as SyncReturnType<typeof pageLoader>
    const { data } = usePromise(Api.emby?.getPublicInfo)
    const [medias, setMedias] = useState<Map<string, Media[]>>({})
    const [recommend, setRecommend] = useState<Media[]>([])
    useEffect(() => {
        log.info(data)
        if (data) {
            document.title = data.ServerName
        }
    }, [data])
    useEffect(() => {
    }, [])

    useEffect(() => {
        if (albums?.Items) {
            albums.Items.forEach(item => {
                const id = Number(item.Id)
                Api.emby?.getLatestMedia?.(id)
                    .then(medias => {
                        setMedias(map => ({...map, [item.Name]: medias}))
                        if (medias.length > 3) {
                            setRecommend(r => [...r, medias[0], medias[1], medias[3]])
                        }
                    })
            })
        }
    }, [albums])
    
    return (
        <div className={style["page"]}>
            {recommend && <Banner className={style["banner"]} banners={
                recommend.map(model => <BannerCard key={model.Id} model={model} />)
            } /> }
            <Header />
            <p className={style["title"]}>我的媒体</p>
            <Stack direction={"row"}>
                {albums && albums.Items.map((item, i) => <Album key={`album-${i}`} {...item}/>)}
            </Stack>
            {medias && Object.entries(medias).filter(([key, value]) => value && value.length).map(([name, media]) => (
                <div key={name} className={style["playlist"]}>
                <p className={style["title"]}>{name}</p>
                <Stack direction={"row"}>
                    {media && media.map((movie, i) => <MediaCard key={`media-${i}`} {...movie} />)}
                </Stack>
                </div>
            ))}
        </div>
    )
}