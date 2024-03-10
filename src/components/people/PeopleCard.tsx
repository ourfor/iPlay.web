import { imageUrl } from "@api/config";
import { People } from "@model/MediaDetail";
import style from "./PeopleCard.module.scss"
import { Image } from "@components/base/Image";

export function PeopleCard(people: People) {
    const avator = imageUrl(people.Id, "")
    return (
        <div className={style["people"]}>
            <Image ratio={2/3} src={avator} alt={people.Name} />
            <span>{people.Name}</span>
            <span>扮演 {people.Role}</span>
        </div>
    )
}