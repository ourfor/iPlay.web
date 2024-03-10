import { ViewDetail } from "@model/View";
import style from "./Album.module.scss"
import { imageUrl } from "@api/config";
import { useNavigate } from "react-router-dom";
import { Image } from "@components/base/Image";

export function Album(detail: ViewDetail) {
    const navigate = useNavigate()
    const url = imageUrl(detail.Id, detail.Etag)
    return (
        <div className={style["album"]}
            onClick={() => navigate(`/album/${detail.Id}`)}>
            <Image ratio={detail.PrimaryImageAspectRatio}
                className={style.cover} 
                src={url} alt={detail.Name} />
            <p>{detail.Name}</p>
        </div>
    )
}