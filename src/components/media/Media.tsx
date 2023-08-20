import { imageUrl } from "@api/config";
import { Media } from "@model/Media";
import style from "./Media.module.scss"
import { useNavigate } from "react-router-dom";
import { Image } from "@components/base/Image";

export function MediaCard(media: Media) {
    const navigate = useNavigate()
    const url = imageUrl(media.Id, media.ImageTags.Primary)
    return (
        <div onClick={() => navigate(`/${media.Type === "Series" ? "series" : "movie"}/${media.Id}`)} 
            className={style.card}>
            <Image ratio={media.PrimaryImageAspectRatio} 
                className={style.img}
                alt={media.Name}
                src={url} />
            <p>{media.Name}</p>
        </div>
    )
}