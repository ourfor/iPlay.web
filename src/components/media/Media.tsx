import { imageUrl } from "@api/config";
import { Media } from "@model/Media";
import style from "./Media.module.scss"
import { useNavigate } from "react-router-dom";

export function MediaCard(media: Media) {
    const navigate = useNavigate()
    const url = imageUrl(media.Id, media.ImageTags.Primary)
    return (
        <div onClick={() => navigate(`/detail/${media.Id}`)} className={style["card"]}>
            <img src={url} />
            <p>{media.Name}</p>
        </div>
    )
}