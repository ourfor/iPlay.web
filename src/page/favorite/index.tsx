import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"
import style from "./index.module.scss"
import { logger } from "@helper/log"
import { TMDB } from "@api/tmdb"
import { Search } from "@components/search/Search"
import { Header } from "@components/header/Header"
import { Adsense } from "@components/adsense/Adsense"
import Firework from "@components/firework/firework"
import { Explosion } from "@components/firework/explosion"
import { Comment } from "@components/comment/comment"
import { MovieCard } from "@page/search/MovieCard"
import { Tag } from "antd"
import { Card } from "@components/card/Card"

const colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"]

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
    const trend = await TMDB.discoverMovie()
    logger.info(`trending`, trend)
    return {
        params: {
            query,
        },
        data,
        trend
    }
}

export default function Page() {
    const {params: {query}, data, trend } = useLoaderData() as SyncReturnType<typeof pageLoader>
    const navigate = useNavigate()
    
    return (
        <div className={style["page"]}>
            <Header />
            <section className={style.trend}>
                {trend.results.length > 0 ? <h3>近期热播</h3> : null}
                {trend.results.map((movie, i) => 
                    <MovieCard color={colors[i%colors.length]} key={i} movie={movie} />
                )}
            </section>
            <Adsense />
            <Comment />
            <Explosion />
        </div>
    )
}
