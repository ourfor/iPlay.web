import { imageUrl } from "@api/config";
import { Stack } from "@components/layout/Stack";
import { usePromise } from "@hook/usePromise";
import style from "./Season.module.scss"
import { useNavigate } from "react-router-dom";
import { Badge } from "@components/badge/Badge";
import { UnplayedCount } from "@components/badge/UnplayedCount";
import { Api } from "@api/emby";

export interface SeasonCardListProps {
    vid: string | number
}
export function SeasonCardList({ vid }: SeasonCardListProps) {
    const { data } = usePromise(() => Api?.emby?.getSeasons?.(Number(vid)), [vid])
    return (
        <Stack direction="row">
            {data && data.map(season => <SeasonCard 
                key={season.Id}
                sid={season.Id} 
                name={season.Name}
                unplayedCount={season.UserData.UnplayedItemCount}
                etag={season.ImageTags.Primary} />
            )}
        </Stack>
    )
}

export interface SeasonCardProps {
    sid: string
    etag: string
    name: string
    unplayedCount?: number
}

export function SeasonCard(props: SeasonCardProps) {
    const navigate = useNavigate()
    const src = imageUrl(props.sid, props.etag)
    return (
        <Badge>
            <div className={style["card"]}
                onClick={() => navigate(`/season/${props.sid}`)}>
                <img src={src} />
                <p>{props.name}</p>
            </div>
            <UnplayedCount count={props.unplayedCount} />
        </Badge>
    )
}