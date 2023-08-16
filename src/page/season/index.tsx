import { getMedia } from "@api/view"
import { Spin } from "@components/animation/Spin"
import { EpisodeList } from "@components/media/Episode"
import { useAppSelector } from "@data/StoreHook"
import { usePromise } from "@hook/usePromise"
import { User } from "@model/User"
import { useLocation } from "react-router-dom"
import style from "./index.module.scss"
import { imageUrl } from "@api/config"

export default function Page() {
    const id = useLocation().pathname.split("/").pop()
    const user = useAppSelector(state => state.user)
    const {loading, data} = usePromise(() => getMedia(user as User, Number(id)), [user, id])
    if (loading) {
        return <Spin />
    }
    if (!data) return null;
    return (
        <div className={style["page"]}>
            <div className={style["intro"]}>
                <img className={style["poster"]} src={imageUrl(data.Id ?? "", {maxHeight: 600, maxWidth: 400})} />
                <div className={style["right"]}>
                    <h3>{data?.SeriesName}</h3>
                    <article>{data?.Overview}</article>
                </div>
            </div>
            <EpisodeList sid={data.Id} vid={data.SeriesId} />
        </div>
    )
}