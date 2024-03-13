import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"
import style from "./index.module.scss"
import { logger } from "@helper/log"
import { TMDB } from "@api/tmdb"
import { MovieCard } from "./MovieCard"
import { Search } from "@components/search/Search"
import { Header } from "@components/header/Header"
import { Pagination } from "antd"
import { Adsense } from "@components/adsense/Adsense"
import Firework from "@components/firework/firework"

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
    const navigate = useNavigate()
    
    return (
        <div className={style["page"]}>
            <Header />
            <Search className={style.search} 
                initValue={query ?? ""}
                onValueChange={q => navigate(`/search?query=${q}`)} />
            {query?.length ?? 0 > 0 ?
            <h1>搜索结果: {query}, 共{data?.total_results}个结果</h1>
            : null}
            <div className={style.searchResult}>
                {data?.results.map((movie, i) => <MovieCard key={i} movie={movie} />)}
            </div>
            {(data?.total_pages ?? 0) > 1 ?
            <Pagination className={style.selectPage}
                showSizeChanger={false}
                defaultPageSize={1}
                total={data?.total_pages ?? 0}
                current={data?.page ?? 1}
                onChange={(page) => navigate(`/search?query=${query}&page=${page}`)} />
            : null}
            <Firework />
            <Adsense />
        </div>
    )
}

export function searchMovie(arg0: string | null, arg1: number) {
    throw new Error("Function not implemented.")
}
