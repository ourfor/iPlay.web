import { Spin } from "@components/animation/Spin"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import style from "./index.module.scss"
import { Player } from "@components/media/Player"
import { Api } from "@api/emby"
import { useEffect } from "react"
import { config } from "@api/config"

export async function pageLoader({request, params}: LoaderFunctionArgs) {
    const id = params.id ?? ""
    const siteId = new URL(request.url).searchParams.get("siteId") ?? "1"
    const type = request.url.includes("/movie") ? "movie" : "series"
    const data = await config.iplay?.getMediaSource?.(siteId, id)
    return {
        data: data?.data,
        type,
        id
    }
}

export default function Page() {
    const { data } = useLoaderData() as SyncReturnType<typeof pageLoader>
    if (!data) return <Spin />
    return (
        <div className={style["page"]}>
            <Player model={data} />
        </div>
    )
}