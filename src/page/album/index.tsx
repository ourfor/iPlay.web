import { Api } from "@api/emby"
import { MediaCard } from "@components/media/Media"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import style from "./index.module.scss"
import { Background } from "@components/background/Background"
import { imageUrl } from "@api/config"

export async function pageLoader({params}: LoaderFunctionArgs) {
    const id = Number(params.id)
    const album = await Api.emby?.getMedia?.(id)
    const type = album?.CollectionType === "tvshows" ? "Series" : "Movie"
    const data = await Api.emby?.getCollection?.(id, type)
    return {
        params: {id},
        data,
        album
    }
}

export default function Page() {
    const {params: {id}, data, album } = useLoaderData() as SyncReturnType<typeof pageLoader>
    return (
        <div className={style["page"]}>
            <Background src={imageUrl(id, album?.Etag ?? "")} />
            <h3 className={style.title}>{album?.Name}</h3>
            <div className={style["content"]}>
                {data && data.map(media => <MediaCard key={media.Id} {...media} />)}
            </div>
        </div>
    )
}