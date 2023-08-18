import { imageUrl } from "@api/config"
import { Stack } from "@components/layout/Stack"
import { PeopleCard } from "@components/people/PeopleCard"
import { log } from "@helper/log"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"
import style from "./index.module.scss"
import { Button, Chip } from "@mui/material"
import { SeasonCardList } from "@components/media/Season"
import { Map } from "@model/Map"
import { Api } from "@api/emby"
import { Background } from "@components/background/Background"

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
    if (data) return (
        <div className={style["page"]}>
            <Background src={imageUrl(data.Id, data.BackdropImageTags[0], "Backdrop/0")} />
            <div className={style["content"]}>
                <div className={style["media-card"]}>
                    <img className={style["cover"]}
                        src={imageUrl(data.Id, { maxWidth: 1050, maxHeight: 700, tag: data.ImageTags.Primary })} />
                    <div>
                        <h3 className={style["title"]}>{data.Name}</h3>
                        {data.Genres.map((genre, i) => <Chip className={style["tag"]} size="small" color="primary" key={`genre-${i}`} label={genre} variant="outlined" />)}
                        <article>
                            {data.Overview}
                        </article>
                        {type === "movie" && 
                        <Button onClick={() => navigate(`/play/${id}`)} 
                            color="primary">立即播放
                        </Button>
                        }
                    </div>
                </div>
                {type === "series" && (
                    <>
                    <h4>季</h4>
                    <SeasonCardList vid={data.Id} />
                    <h4>演职人员</h4>
                    </>
                )}
                <Stack direction="row">
                    {data.People.map((people, i) => <PeopleCard key={`people-${i}`} {...people} />)}
                </Stack>
            </div>
        </div>
    )
    return null
}