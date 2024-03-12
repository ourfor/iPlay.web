import { avatorUrl as userAvatorUrl } from "@api/config"
import style from "./Header.module.scss"
import logoUrl from "./logo.png"
import searchUrl from "./search.svg"
import { useAppDispatch, useAppSelector } from "@data/StoreHook"
import classnames from "classnames"
import { Avatar, Select } from "@radix-ui/themes"
import { updateActiveId } from "@data/Site"
import { useNavigate } from "react-router-dom"


export interface HeaderProps {
    className?: string
}

export function Header({className}: HeaderProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const site = useAppSelector(state => state.site)
    const user = site.site.user
    const avatorUrl = userAvatorUrl(user?.User?.Id ?? "", "", "Primary")
    const switchSite = (id: string) => {
        dispatch(updateActiveId(id))
        setTimeout(() => {
            navigate(`/?site=${id}`)
        }, 500)
    }
    return (
        <div className={classnames(style.header, className)}>
            <img alt="🍵" className={style.logo} src={logoUrl} />
            <div className={style.left}>
                <span>首页</span>
                <span>喜爱</span>
                <span onClick={() => navigate(`/search`)}>搜索</span>
            </div>
            <div className={style.right}>
                <img alt="🔍" className={style.icon} src={searchUrl} />
                <Avatar className={style.avator} src={avatorUrl} fallback={"?"} />
                <div className={style.switchSite}>
                <Select.Root size="1"
                    onValueChange={switchSite}
                    defaultValue={site.site.id ?? ""}>
                    <Select.Trigger placeholder="选择媒体文件" />
                    <Select.Content>
                        {Object.entries(site.sites).map(([id, site], i) => 
                        <Select.Item key={`${i}`} value={id}>{site?.name}</Select.Item>)}
                    </Select.Content>
                </Select.Root>
                </div>
            </div>
        </div>
    )
}