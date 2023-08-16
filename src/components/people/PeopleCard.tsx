import { imageUrl } from "@api/config";
import { People } from "@model/MediaDetail";
import style from "./PeopleCard.module.scss"

export function PeopleCard(people: People) {
    const avator = imageUrl(people.Id, "")
    return (
        <div className={style["people"]}>
            <img src={avator} />
            <span>{people.Name}</span>
            <span>扮演 {people.Role}</span>
        </div>
    )
}