import { imageUrl } from "@api/config"
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

export const colors = [
    "cyan", "gold", "magenta", "orange", "lime"
]

export async function pageLoader({ request, params }: LoaderFunctionArgs) {
    const id = Number(params.id)
    const type = request.url.includes("/movie") ? "movie" : "series"
    const data = await Api.emby?.getMedia?.(id)
    return {
        data,
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
    const bgImgset = imageUrl(data.Id, data.BackdropImageTags[0], "Backdrop/0")
    const imgset = imageUrl(data.Id, {maxWidth: 1050, maxHeight: 700, tag: data.ImageTags.Primary})
    return (
        <div className={style["page"]}>
            <Background src={bgImgset} />
            <div className={style.mobileCover}>
                <Image ratio={16/9} src={bgImgset} />
            </div>
            <div className={style["content"]}>
                <div className={style["media-card"]}>
                    <img className={style["cover"]} src={imgset} />
                    <div>
                        <h3 className={style.title}>{data.Name}</h3>
                        {data.Genres.map((genre, i) => 
                            <Tag color={colors[i%colors.length]} 
                                key={`genre-${i}`}>
                                {genre}
                            </Tag>
                        )}
                        <article>{data.Overview}</article>
                        {type === "movie" && 
                        <Button className={style.playNow}
                            onClick={() => navigate(`/play/${id}`)} 
                            color="primary">立即播放
                        </Button>
                        }
                    </div>
                </div>
                {type === "series" && (
                    <>
                    <h4>季</h4>
                    <SeasonCardList vid={data.Id} />
                    </>
                )}
                {!_.isEmpty(data.People) && (
                <>
                    <h4>演职人员</h4>
                    <Stack direction="row">
                        {data.People.map((people, i) => <PeopleCard key={`people-${i}`} {...people} />)}
                    </Stack>
                </>
                )}
            </div>
        </div>
    )
}