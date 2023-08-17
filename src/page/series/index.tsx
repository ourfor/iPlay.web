import { imageUrl } from "@api/config"
import { Stack } from "@components/layout/Stack"
import { PeopleCard } from "@components/people/PeopleCard"
import { log } from "@helper/log"
import { useLoaderData } from "react-router-dom"
import style from "./index.module.scss"
import { Chip } from "@mui/material"
import { SeasonCardList } from "@components/media/Season"
import { Map } from "@model/Map"
import { Api } from "@api/emby"

export async function pageLoader({ params }: {params: Map<string, string>}) {
    const id = Number(params.id)
    log.info('detail id', id)
    const data = await Api.emby?.getMedia?.(id)
    return {
        data
    }
}

export default function Page() {
    const {
        data
    } = useLoaderData() as SyncReturnType<typeof pageLoader>
    log.info(`detail data`, data)
    if (data) return (
        <div className={style["page"]}>
            <div className={style["background"]} style={{ "--bg-image": `url(${imageUrl(data.Id, data.BackdropImageTags[0], "Backdrop/0")}` } as any} />
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
                    </div>
                </div>
                <h4>季</h4>
                <SeasonCardList vid={data.Id} />
                <h4>演职人员</h4>
                <Stack direction="row">
                    {data.People.map((people, i) => <PeopleCard key={`people-${i}`} {...people} />)}
                </Stack>
            </div>
        </div>
    )
    return null
}