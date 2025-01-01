import { imageUrl } from "@api/config";
import { Media } from "@model/Media";
import style from "./Media.module.scss"
import { useNavigate } from "react-router-dom";
import { Image } from "@components/base/Image";
import { Badge } from "@components/badge/Badge";
import classnames from "classnames";
import { UnplayedCount } from "@components/badge/UnplayedCount";
import { logger } from "@helper/log";
import { MediaModel } from "@api/iPlayApi";

export interface MediaCardProps {
    className?: string
    model?: MediaModel
}

export function MediaCard({ model }: MediaCardProps) {
    const navigate = useNavigate()
    return (
        <Badge>
            <div id={`mediacard-${model?.id}`} onClick={() => navigate(`/${model?.type === "Series" ? "series" : "movie"}/${model?.id}`)}
                className={style.card}>
                <Image ratio={0.667}
                    style={{borderRadius: "0.45rem"}}
                    className={style.img}
                    alt={model?.title}
                    src={model?.image.primary ?? ""} />
                <p>{model?.title}</p>
            </div>
            <UnplayedCount count={0} />
        </Badge>
    )
}