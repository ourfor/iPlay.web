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

export async function pageLoader({request, params}: LoaderFunctionArgs) {
    const query = queryParams<{site?: string}>(request.url)
    logger.info(`site id`, query.site)
    const albums = await Api.emby?.getView?.()
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
    const [medias, setMedias] = useState<Map<string, Media[]>>({})
    const [recommend, setRecommend] = useState<Media[]>([])
    useEffect(() => {
        logger.info(data)
        if (data) {
            document.title = data.ServerName
        }
    }, [data])

    useEffect(() => {
        setMedias({})
        setRecommend([])
    }, [siteId])

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
        <div className={style.page}>
            <div className={style.navigator}>
                <Header className={style.header} />
                {!_.isEmpty(recommend) && <Banner className={style["banner"]} banners={
                    recommend.map(model => <BannerCard key={model.Id} model={model} />)
                } />}
            </div>
            {!_.isEmpty(albums?.Items) && (
            <>
                <span className={style.albumTitle}>我的媒体</span>
                <Stack className={style.albums} direction={"row"}>
                    {albums?.Items.map((item, i) => <Album key={`album-${i}`} {...item}/>)}
                </Stack>
            </>
            )}
            {medias && Object.entries(medias).filter(([key, value]) => value && value.length).map(([name, media]) => (
                <div key={name} className={style.playlist}>
                <p className={style.title}>{name}</p>
                <Stack direction={"row"}>
                    {media && media.map((movie, i) => <MediaCard className={style.mediaCard} key={`media-${i}`} {...movie} />)}
                </Stack>
                </div>
            ))}
            <Adsense />
            <Footer />
        </div>
    )
}