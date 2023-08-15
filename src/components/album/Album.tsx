import { ViewDetail } from "@model/View";
import style from "./Album.module.scss"
import { imageUrl } from "@api/config";

export function Album(detail: ViewDetail) {
    const url = imageUrl(detail.Id, detail.Etag)
    return (
        <div className={style["album"]}>
            <img style={{maxHeight: 128}} src={url} />
            <p>{detail.Name}</p>
        </div>
    )
}