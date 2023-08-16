import { imageUrl } from "@api/config";
import { Media } from "@model/Media";
import style from "./Media.module.scss"
import { Link } from "react-router-dom";

export function MediaCard(media: Media) {
    const url = imageUrl(media.Id, media.ImageTags.Primary)
    return (
        <Link to={`/detail/${media.Id}`}>
        <div className={style["card"]}>
            <img  src={url} />
            <p>{media.Name}</p>
        </div>
        </Link>
    )
}