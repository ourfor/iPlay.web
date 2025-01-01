import { Api } from "@api/emby"
import { MediaCard } from "@components/media/Media"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"
import style from "./index.module.scss"
import { Background } from "@components/background/Background"
import { imageUrl } from "@api/config"
import { Pagination } from "antd"
import { Stack } from "@components/layout/Stack"
import { queryParams } from "@hook/useQuery"
import { useEffect } from "react"

export async function pageLoader({params, request}: LoaderFunctionArgs) {
    const id = Number(params.id)
    const query = queryParams<{page: string}>(request.url)
    const page = Number(query.page ?? 0) ?? 0
    const album = await Api.emby?.getMedia?.(id)
    const type = album?.CollectionType === "tvshows" ? "Series" : "Movie"
    const data = await Api.emby?.getCollection?.(id, type, page)
    return {
        params: {id, page},
        data: data?.Items,
        total: data?.TotalRecordCount,
        album
    }
}

export default function Page() {
    const {params: {id, page}, total, data, album } = useLoaderData() as SyncReturnType<typeof pageLoader>
    const navigate = useNavigate()

    useEffect(() => {
        const ele = document.querySelector('[id]');
        if (ele) {
            (ele as HTMLElement).focus();
        }
    })

    return (
        <div className={style.page}>
            <Background src={imageUrl(id, album?.Etag ?? "")} />
            <div className={style.content}>
                {data && data.map(media => <MediaCard key={media.Id} {...media} />)}
            </div>
            <Stack direction="row">
            <Pagination
                className={style.pageSelector}
                showSizeChanger={false}
                pageSize={50}
                total={total}
                current={page+1}
                onChange={page => navigate(`/album/${id}?page=${page-1}`)}
            />
            </Stack>
        </div>
    )
}