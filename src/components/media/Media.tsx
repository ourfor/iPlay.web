import { imageUrl } from "@api/config";
import { Media } from "@model/Media";
import style from "./Media.module.scss"
import { useNavigate } from "react-router-dom";
import { Image } from "@components/base/Image";
import { Badge } from "@components/badge/Badge";
import classnames from "classnames";

export interface MediaCardProps extends Media {
    className?: string
}

export function MediaCard(media: MediaCardProps) {
    const navigate = useNavigate()
    const url = imageUrl(media.Id, media.ImageTags.Primary)
    return (
        <Badge>
        <div onClick={() => navigate(`/${media.Type === "Series" ? "series" : "movie"}/${media.Id}`)} 
            className={classnames(style.card, media.className)}>
            <Image ratio={media.PrimaryImageAspectRatio} 
                className={style.img}
                alt={media.Name}
                src={url} />
            <p>{media.Name}</p>
        </div>
        {media.UserData.UnplayedItemCount && <div className={style.unplayed}>{media.UserData.UnplayedItemCount}</div>}
        </Badge>
    )
}