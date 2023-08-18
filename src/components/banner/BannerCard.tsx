import { Media } from "@model/Media"
import style from "./BannerCard.module.scss"
import { imageUrl } from "@api/config"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export interface BannerCardProps {
    model: Media
}
export function BannerCard({model}: BannerCardProps) {
    const navigate = useNavigate()
    const type = model.Type
    return (
        <div className={style["banner-item"]} style={{ width: "100vw", height: "100vh" }}>
            <img width={"100%"} height={"100%"} src={imageUrl(model.Id, { maxWidth: 1920, maxHeight: 1080, tag: model.BackdropImageTags[0] }, "Backdrop/0")} />
            <p className={style["banner-title"]}>{model.Name}</p>
            <article>{model.Overview}</article>
            <Button variant="outlined"
                onClick={() => navigate(`/${type === "Series" ? "series" : "play"}/${model.Id}`)}
                className={style["watch"]}>立即观看</Button>
        </div>
    )
}