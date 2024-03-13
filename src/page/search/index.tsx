import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"
import style from "./index.module.scss"
import { logger } from "@helper/log"
import { TMDB } from "@api/tmdb"
import { MovieCard } from "./MovieCard"
import { Search } from "@components/search/Search"
import { Header } from "@components/header/Header"
import { Pagination, Tag } from "antd"
import { Adsense } from "@components/adsense/Adsense"
import Firework from "@components/firework/firework"
import { Api } from "@api/emby"
import { MediaCard } from "@components/media/Media"

export const colors = [
    "cyan", "gold", "magenta", "orange", "lime",
    "green", "blue", "purple", "red", "volcano",
    "pink", "geekblue", "cyan", "gold", "magenta",
]

export async function pageLoader({request, params}: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const query = url.searchParams.get("query")
    const page = Number(url.searchParams.get("page"))
    logger.info(`search`, url.searchParams.get("query"))
    logger.info("search")
    let data = null
    let local = null
    let recommend = null
    if (query) {
        data = await TMDB.searchMovie(query, page == 0 ? 1 : page)
        logger.info(data)
        local = await Api.emby?.getItemWithName?.(query)
        logger.info(local)
    } else {
        recommend = await Api.emby?.searchRecommend?.()
    }
    return {
        params: {
            query,
        },
        data,
        local,
        recommend
    }
}

export default function Page() {
    const {params: {query}, recommend, data, local } = useLoaderData() as SyncReturnType<typeof pageLoader>
    const navigate = useNavigate()
    
    return (
        <div className={style["page"]}>
            <Header />
            <Search className={style.search} 
                initValue={query ?? ""}
                onValueChange={q => navigate(`/search?query=${q}`)} />
            <div className={style.searchRecommend}>
                {recommend?.Items?.map((item, i) => <Tag key={i} color={colors[i%colors.length]} onClick={() => navigate(`/search?query=${item.Name}`)}>{item.Name}</Tag>)}
            </div>
            <div className={style.searchResult}>
                {query?.length ?? 0 > 0 ?
                <h3>本地结果: {query}, 共{local?.Items.length}个结果</h3>
                : null}
                <section className={style.local}>
                    {local?.Items.map((item, i) => <MediaCard key={i} className={style.mediaCard} {...item} />)}
                </section>
                {query?.length ?? 0 > 0 ?
                <h3>外部结果: {query}, 共{data?.total_results}个结果</h3>
                : null}
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
