import style from "./index.module.scss"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@data/StoreHook"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"
import SettingIcon from "@components/setting/SettingIcon"
import { DialogID, openDialog } from "@data/Event"
import { produceMessage } from "@data/Message"
import { Button, Checkbox, TextField } from "@radix-ui/themes"
import { DEFAULT_SITE, Site, loginAsGuest, loginToSite, updateSiteConfig } from "@data/Site"
import { UpdateIcon } from "@radix-ui/react-icons"
import { SpinBox } from "@components/animation/Spin"
import { EmbyConfig } from "@helper/env"
import { logger } from "@helper/log"
import { loginToDashboard } from "@data/Dashboard"

export async function pageLoader({request, params}: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const site = url.searchParams.get("site")
    const name = url.searchParams.get("name")
    const host = url.searchParams.get("host")
    const port = url.searchParams.get("port")
    const path = url.searchParams.get("path")
    const protocol = url.searchParams.get("protocol")
    return {
        params: {
            name, site, host, port, path, protocol
        },
    }
}

export default function Page() {
    const {params: query } = useLoaderData() as SyncReturnType<typeof pageLoader>
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const activeSite = useAppSelector(state => state.site.site)

    const getEmbyFromQuery = () => {
        const {host, port, path, name, protocol} = query
        const emby: Partial<EmbyConfig> = {}
        if (host) emby.host= host
        if (port) emby.port = Number(port)
        if (path) emby.path = path
        if (protocol) emby.protocol = protocol === "https" ? "https" : "http"
        if (Object.values(emby).length === 0) return null
        else {
            return {
                ...activeSite,
                name: name ?? activeSite.name ?? "🍵",
                emby: {
                    ...activeSite.emby,
                    ...(emby as any)
                }
            }
        }
    }

    const updateSiteFromQuery = (site: Site) => {
        const { site: siteId } = query
        logger.info(siteId, site)
        dispatch(updateSiteConfig({
            id: siteId ?? site.id,
            emby: site.emby
        }))
    }

    useEffect(() => {
        const emby = getEmbyFromQuery()
        if (!emby) {
            return
        }
        updateSiteFromQuery(emby)
    }, [])

    const submit = () => {
        const callback = {
            resolve: () => {
                setLoading(false)
                dispatch(produceMessage({
                    type: "success",
                    data: "登录成功，即将跳转主页",
                    duration: 1000
                }))
                setTimeout(() => {
                    navigate({
                        pathname: "/"
                    })
                }, 1000)
            },
            reject: () => {
                setLoading(false)
                dispatch(produceMessage({
                    type: "error",
                    data: ""
                }))
            }
        }
        setLoading(true)
        dispatch(loginToDashboard({
            server: "http://localhost:8080",
            username,
            password,
            callback
        }))
    }
    const onLoginAsGuest = () => {
        dispatch(loginAsGuest(""))
        dispatch(produceMessage({
            type: "success",
            data: "登录成功，即将跳转主页",
            duration: 1000
        }))
        setTimeout(() => {
            navigate({
                pathname: "/"
            })
        }, 1000)
    }

    return (
        <div className={style["page"]}>
            <div className={style["wrap"]}>
                <div className={style["container"]}>
                    <p className={style["title"]}>登录账号</p>
                    <div className={style.user}>
                    <TextField.Input
                        className={style["input"]}
                        required
                        id="outlined-required"
                        placeholder="用户名"
                        // label="Username"
                        value={username}
                        onChange={e => setUserName(e.target.value)}
                        // sx={customStyle}
                    />
                    <TextField.Input
                        className={style["input"]}
                        id="outlined-password-input"
                        // label="Password"
                        placeholder="密码"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                        // sx={customStyle}
                    />
                    </div>

                    <Button className={style["login"]}
                        onClick={submit}
                        id="login-submit"
                        variant="soft">
                        {loading && (
                        <SpinBox>
                            <UpdateIcon />
                        </SpinBox>
                        )}
                        登录
                    </Button>
                    <div className={style["items"]}>
                        <Checkbox className={style["remember-me"]}
                            variant="surface"
                            checked={remember}
                            onCheckedChange={checked => setRemember(checked === true)}
                            /> 记住我
                    </div>
                    <div className={style["items"]}>
                        登录表示同意用户协议，版权所有
                    </div>
                    <div onClick={() => dispatch(openDialog({id: DialogID.SETTING, visible: true}))} 
                        className={style["tool"]}>
                        <SettingIcon />
                    </div>
                </div>
                <Button className={[style.login, style.guest].join(" ")}
                    variant="soft"
                    onClick={() => onLoginAsGuest()}>访客登陆</Button>
            </div>
        </div>
    )
}