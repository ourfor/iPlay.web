import { EpisodeList } from "@components/media/Episode"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import style from "./index.module.scss"
import { imageUrl } from "@api/config"
import { Api } from "@api/emby"
import { Adsense } from "@components/adsense/Adsense"
import { Comment } from "@components/comment/comment"

export async function pageLoader({ request, params }: LoaderFunctionArgs) {
    const id = Number(params.id)
    const data = await Api.emby?.getMedia?.(id)
    if (data?.Name) document.title = `🍵 ${data?.Name}`
    return {
        params: {
            id
        },
        data
    }
}

export default function Page() {
    const { data } = useLoaderData() as SyncReturnType<typeof pageLoader>
    if (!data) return null
    const imgset = imageUrl(data.Id ?? "", { maxHeight: 600, maxWidth: 400, tag: data.ImageTags.Primary })
    return (
        <div className={style["page"]}>
            <div className={style["intro"]}>
                <img className={style["poster"]} src={imgset} />
                <div className={style["right"]}>
                    <h3 className={style.title}>{data?.SeriesName}</h3>
                    <article className={style.overview}>{data?.Overview}</article>
                </div>
            </div>
            <EpisodeList sid={data.Id} vid={data.SeriesId} />
            <Adsense />
            <Comment />
        </div>
    )
}