import { Spin } from "@components/animation/Spin"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import style from "./index.module.scss"
import { Player } from "@components/media/Player"
import { Api } from "@api/emby"
import { useEffect } from "react"
import { logger } from "@helper/log"
import { TMDB } from "@api/tmdb"
import { MovieCard } from "./MovieCard"

export async function pageLoader({request, params}: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const query = url.searchParams.get("query")
    const page = Number(url.searchParams.get("page"))
    logger.info(`search`, url.searchParams.get("query"))
    let data = null
    if (query) {
        data = await TMDB.searchMovie(query, page == 0 ? 1 : page)
        logger.info(data)
    }
    return {
        params: {
            query,
        },
        data
    }
}

export default function Page() {
    const {params: {query}, data } = useLoaderData() as SyncReturnType<typeof pageLoader>

    
    return (
        <div className={style["page"]}>
            <h1>搜索结果: {query}</h1>
            <div className={style.searchResult}>
                {data?.results.map((movie, i) => <MovieCard key={i} movie={movie} />)}
            </div>
        </div>
    )
}

export function searchMovie(arg0: string | null, arg1: number) {
    throw new Error("Function not implemented.")
}
