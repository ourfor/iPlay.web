import { Album } from "@components/album/Album"
import { MediaCard } from "@components/media/Media"
import { logger } from "@helper/log"
import { usePromise } from "@hook/usePromise"
import { Media } from "@model/Media"
import { useEffect, useState } from "react"
import { Map } from "@model/Map"
import style from "./index.module.scss"
import { Header } from "@components/header/Header"
import { Api } from "@api/emby"
import { Banner } from "@components/banner/Banner"
import { BannerCard } from "@components/banner/BannerCard"
import { LoaderFunctionArgs, useLoaderData, useNavigation } from "react-router-dom"
import { Stack } from "@components/layout/Stack"
import _ from "lodash"
import { queryParams } from "@hook/useQuery"
import { Adsense } from "@components/adsense/Adsense"
import { Footer } from "@components/footer/Footer"
import { config } from "@api/config"
import { MediaModel } from "@api/iPlayApi"

export async function pageLoader({request, params}: LoaderFunctionArgs) {
    const query = queryParams<{site?: string}>(request.url)
    logger.info(`site id`, query.site)
    const albums = await config.iplay?.getAllAlbums(query.site ?? "1") 
    return {
        params: {
            siteId: query.site
        },
        albums
    }
}

export default function Page() {
    const { albums, params: {siteId} } = useLoaderData() as SyncReturnType<typeof pageLoader>
    const { data } = usePromise(Api.emby?.getPublicInfo, [siteId])
    const [medias, setMedias] = useState<Map<string, MediaModel[]>>({})
    useEffect(() => {
        logger.info(data)
        if (data) {
            document.title = data.ServerName
        }
    }, [data])

    useEffect(() => {
        setMedias({})
    }, [siteId])

    useEffect(() => {
        if (albums) {
            albums.data?.forEach(item => {
                const id = Number(item.id)
                config.iplay?.getLatestAlbumMedia?.(item)
                    .then(medias => {
                        setMedias(map => ({...map, [item.name]: medias?.data}))
                    })
            })
        }
    }, [albums])
    
    return (
        <div className={style.page}>                
            {!_.isEmpty(albums) && (
            <>
                <span className={style.albumTitle}>我的媒体</span>
                <Stack className={style.albums} direction={"row"}>
                    {albums.data?.map((item, i) => <Album key={`album-${i}`} model={item} />)}
                </Stack>
            </>
            )}
            {medias && Object.entries(medias).filter(([key, value]) => value && value.length).map(([name, media]) => (
                <div key={name} className={style.playlist}>
                <p className={style.title}>{name}</p>
                <Stack className={style.collection} direction={"row"}>
                    {media && media.map((movie, i) => <MediaCard className={style.mediaCard} key={`media-${i}`} model={movie} />)}
                </Stack>
                </div>
            ))}
        </div>
    )
}