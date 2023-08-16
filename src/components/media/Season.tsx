import { imageUrl } from "@api/config";
import { getSeasons } from "@api/view";
import { Stack } from "@components/layout/Stack";
import { useAppSelector } from "@data/StoreHook";
import { usePromise } from "@hook/usePromise";
import { User } from "@model/User";
import style from "./Season.module.scss"
import { useNavigate } from "react-router-dom";

export interface SeasonCardListProps {
    vid: string|number
}
export function SeasonCardList({vid}: SeasonCardListProps) {
    const user = useAppSelector(state => state.user)
    const {data} = usePromise(() => getSeasons(user as User, Number(vid)), [user, vid])
    return (
        <Stack direction="row">
            {data && data.map(season => <SeasonCard key={season.Id} sid={season.Id} name={season.Name} etag={season.ImageTags.Primary} />)}
        </Stack>
    )
}

export interface SeasonCardProps {
    sid: string
    etag: string
    name: string
}

export function SeasonCard(props: SeasonCardProps) {
    const navigate = useNavigate()
    const src = imageUrl(props.sid, props.etag)
    return (
        <div className={style["card"]}
            onClick={() => navigate(`/season/${props.sid}`)}
            >
            <img src={src} />
            <p>{props.name}</p>
        </div>
    )
}