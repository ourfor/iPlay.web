import { avatorUrl as userAvatorUrl } from "@api/config"
import style from "./Header.module.scss"
import logoUrl from "./logo.png"
import searchUrl from "./search.svg"
import { useAppDispatch, useAppSelector } from "@data/StoreHook"
import classnames from "classnames"
import { Avatar, Select } from "@radix-ui/themes"
import { updateActiveId } from "@data/Site"
import { useLocation, useNavigate } from "react-router-dom"


export interface HeaderProps {
    className?: string
}

const menu = [
    {path: "/", name: "首页", onClick: (navigate: any) => navigate("/")},
    {path: "/favorite", name: "喜爱", onClick: (navigate: any) => navigate("/favorite")},
    {path: "/search", name: "搜索", onClick: (navigate: any) => navigate("/search")},
]

export function Header({className}: HeaderProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname
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
                {menu.map((item, i) => (
                    <span key={i} data-path={item.path}
                        onClick={() => item.onClick(navigate)}
                        className={[pathname === item.path ? style.active : ""].join(" ")}>
                        {item.name}
                    </span>
                ))}
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