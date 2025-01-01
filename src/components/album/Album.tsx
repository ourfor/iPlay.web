import { ViewDetail } from "@model/View";
import style from "./Album.module.scss"
import { imageUrl } from "@api/config";
import { useNavigate } from "react-router-dom";
import { Image } from "@components/base/Image";
import { AlbumModel } from "@api/iPlayApi";

interface AlbumProps {
    model: AlbumModel
}

export function Album({ model }: AlbumProps) {
    const navigate = useNavigate()
    return (
        <div id={`album-${model.id}`} className={style["album"]}
            onClick={() => navigate(`/album/${model.id}`)}>
            <Image ratio={16/9.0}
                style={{borderRadius: "0.75rem"}}
                className={style.cover} 
                src={model.image.primary} alt={model.name} />
            <p>{model.name}</p>
        </div>
    )
}