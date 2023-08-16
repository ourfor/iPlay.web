import { imageUrl } from "@api/config"
import { getMedia } from "@api/view"
import { Spin } from "@components/animation/Spin"
import { Stack } from "@components/layout/Stack"
import { PeopleCard } from "@components/people/PeopleCard"
import { useAppSelector } from "@data/StoreHook"
import { log } from "@helper/log"
import { usePromise } from "@hook/usePromise"
import { useQuery } from "@hook/useQuery"
import { User } from "@model/User"
import { useLocation } from "react-router-dom"
import style from "./index.module.scss"
import { Chip } from "@mui/material"
import { SeasonCardList } from "@components/media/Season"

export default function Page() {
    const id = useLocation().pathname.split("/").pop()
    const user = useAppSelector(state => state.user)
    const {loading, data} = usePromise(() => getMedia(user as User, Number(id)), [user, id])
    if (loading) {
        return <Spin />
    }

    log.info(data)
    if (!loading && data) return (
        <div className={style["page"]} 
            style={{"--bg-image": `url(${imageUrl(data.Id, data.BackdropImageTags[0], "Backdrop/0")}`} as any}>
            <div className={style["media-card"]}>
                <img className={style["cover"]} 
                    src={imageUrl(data.Id, {maxWidth: 1050, maxHeight: 700, tag: data.ImageTags.Primary})} />
                <div>
                    <h3 className={style["title"]}>{data.Name}</h3>
                    {data.Genres.map((genre, i) => <Chip size="small" color="primary" key={`genre-${i}`} label={genre} variant="outlined" />)}
                    <article>
                        {data.Overview}
                    </article>
                </div>
            </div>
            <h4>季</h4>
            <SeasonCardList vid={data.Id} />
            <h4>演职人员</h4>
            <Stack direction="row">
            {data.People.map((people, i) => <PeopleCard key={`people-${i}`} {...people}/>)}
            </Stack>
        </div>
    )
    return null
}