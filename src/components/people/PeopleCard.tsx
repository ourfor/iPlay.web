import { imageUrl } from "@api/config";
import { People } from "@model/MediaDetail";
import style from "./PeopleCard.module.scss"
import { Image } from "@components/base/Image";
import { ActorModel } from "@api/iPlayApi";

export interface PeopleCardProps {
    model: ActorModel
}

export function PeopleCard({ model: people }: PeopleCardProps) {
    return (
        <div id={`people-${people.id}`} className={style["people"]}>
            <Image ratio={2/3} src={people.avatar} alt={people.name} />
            <span>{people.name}</span>
            {/* <span>扮演 {people.Role}</span> */}
        </div>
    )
}