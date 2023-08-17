import { Spin } from "@components/animation/Spin"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import style from "./index.module.scss"
import { Player } from "@components/media/Player"
import { Api } from "@api/emby"
import { useEffect } from "react"

export async function pageLoader({params}: LoaderFunctionArgs) {
    const id = Number(params.id)
    const data = await Api.emby?.getPlaybackInfo?.(id)
    return {
        params: {id},
        data
    }
}

export default function Page() {
    const {params: {id}, data } = useLoaderData() as SyncReturnType<typeof pageLoader>
    useEffect(() => {
        if (!data) return
        document.title = data.MediaSources[0].Name
    }, [data])
    
    if (!data) return <Spin />
    return (
        <div className={style["page"]}>
            <Player vid={id} model={data} />
        </div>
    )
}