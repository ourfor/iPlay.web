import { imageUrl } from "@api/config";
import { Media } from "@model/Media";
import style from "./Media.module.scss"
import { useNavigate } from "react-router-dom";
import { Image } from "@components/base/Image";
import { Badge } from "@components/badge/Badge";
import classnames from "classnames";
import { UnplayedCount } from "@components/badge/UnplayedCount";
import { logger } from "@helper/log";

export interface MediaCardProps extends Media {
    className?: string
}

export function MediaCard(media: MediaCardProps) {
    const navigate = useNavigate()
    const url = imageUrl(media.Id, media.ImageTags.Primary)
    return (
        <Badge>
            <div id={`mediacard-${media.Id}`} onClick={() => navigate(`/${media.Type === "Series" ? "series" : "movie"}/${media.Id}`)}
                className={classnames(style.card, media.className)}>
                <Image ratio={media.PrimaryImageAspectRatio}
                    className={style.img}
                    alt={media.Name}
                    src={url} />
                <p>{media.Name}</p>
            </div>
            <UnplayedCount count={media.UserData.UnplayedItemCount} />
        </Badge>
    )
}