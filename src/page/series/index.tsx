import { config, imageUrl, makeUrl, playUrl } from "@api/config"
import { Stack } from "@components/layout/Stack"
import { PeopleCard } from "@components/people/PeopleCard"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"
import style from "./index.module.scss"
import { SeasonCardList } from "@components/media/Season"
import { Api } from "@api/emby"
import { Background } from "@components/background/Background"
import { Button, Tag } from "antd"
import _ from "lodash"
import { Image } from "@components/base/Image"
import { Adsense } from "@components/adsense/Adsense"
import { ExternalPlayer } from "@components/media/ExternalPlayer"
import { MediaSource } from "@model/PlaybackInfo"
import { Comment } from "@components/comment/comment"

export const colors = [
    "cyan", "gold", "magenta", "orange", "lime"
]

export async function pageLoader({ request, params }: LoaderFunctionArgs) {
    const id = params.id ?? ""
    const siteId = new URL(request.url).searchParams.get("siteId") ?? "1"
    const type = request.url.includes("/movie") ? "movie" : "series"
    const data = await config.iplay?.getMedia?.(siteId, id)
    if (data?.data?.title) document.title = `🍹 ${data?.data.title}`
    return {
        data: data?.data,
        type,
        id
    }
}

export default function Page() {
    const {
        data,
        type,
        id
    } = useLoaderData() as SyncReturnType<typeof pageLoader>
    const navigate = useNavigate()
    if (!data) return null
    const bgImgset = data.image.backdrop
    const imgset = imageUrl(data.id, {maxWidth: 1050, maxHeight: 700, tag: data.image.primary})
    const getPlayUrl = (source: MediaSource) => {
        if (source?.Path?.startsWith("http")) return source?.Path
        else return playUrl(source.DirectStreamUrl)
    }
    return (
        <div className={style["page"]}>
            <Background src={bgImgset} />
            <div className={style.mobileCover}>
                <Image ratio={16/9} src={bgImgset} />
            </div>
            <div className={style["content"]}>
                <div className={style["media-card"]}>
                    <img className={style["cover"]} src={data.image.backdrop} />
                    <div>
                        <h3 className={style.title}>{data.title}</h3>
                        {/* {data.Genres.map((genre, i) => 
                            <Tag color={colors[i%colors.length]} 
                                key={`genre-${i}`}>
                                {genre}
                            </Tag>
                        )} */}
                        <article>{data.description}</article>
                        {type === "movie" && 
                        <Button className={style.playNow}
                            onClick={() => navigate(`/play/${id}`)} 
                            color="primary">立即播放
                        </Button>
                        }
                        {data.sources?.map((source, i) => <ExternalPlayer className={style.playerIcon} key={i} src={source.url} />)}
                    </div>
                </div>
                {type === "series" && (
                    <>
                    <h4>季</h4>
                    <SeasonCardList vid={data.id} />
                    </>
                )}
                {!_.isEmpty(data.actors) && (
                <>
                    <h4>演职人员</h4>
                    <Stack direction="row">
                        {data.actors.map((actor, i) => <PeopleCard key={`people-${i}`} model={actor} />)}
                    </Stack>
                </>
                )}
            </div>
            <Adsense />
            <Comment />
        </div>
    )
}