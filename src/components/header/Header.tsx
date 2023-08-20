import { avatorUrl, imageUrl } from "@api/config"
import style from "./Header.module.scss"
import logoUrl from "./logo.png"
import searchUrl from "./search.svg"
import { User } from "@model/User"
import { useAppSelector } from "@data/StoreHook"
import classnames from "classnames"


export interface HeaderProps {
    className?: string
}

export function Header({className}: HeaderProps) {
    const user = useAppSelector(state => state.user)
    const avator = avatorUrl(user?.User?.Id ?? "", "", "Primary")
    return (
        <div className={classnames(style["header"], className)}>
            <img className={style["logo"]} src={logoUrl} />
            <div className={style["left"]}>
                <span>首页</span>
                <span>喜爱</span>
            </div>
            <div className={style["right"]}>
                <img className={style["icon"]} src={searchUrl} />
                <img className={style["avator"]} src={avator} />
            </div>
        </div>
    )
}