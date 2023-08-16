import { ViewDetail } from "@model/View";
import style from "./Album.module.scss"
import { imageUrl } from "@api/config";
import { Link, useNavigate } from "react-router-dom";

export function Album(detail: ViewDetail) {
    const navigate = useNavigate()
    const url = imageUrl(detail.Id, detail.Etag)
    return (
        <div className={style["album"]}
            onClick={() => navigate(`/detail/${detail.Id}`)}>
            <img style={{maxHeight: 128}} src={url} />
            <p>{detail.Name}</p>
        </div>
    )
}