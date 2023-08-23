import style from "./index.module.scss"
import { useState } from "react"
import { useAppDispatch } from "@data/StoreHook"
import { useNavigate } from "react-router-dom"
import SettingIcon from "@components/setting/SettingIcon"
import { DialogID, openDialog } from "@data/Event"
import { produceMessage } from "@data/Message"
import { Button, Checkbox, TextField } from "@radix-ui/themes"
import { loginToSite } from "@data/Site"
import { UpdateIcon } from "@radix-ui/react-icons"
import { SpinBox } from "@components/animation/Spin"

export default function Page() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
        dispatch(loginToSite({
            username,
            password,
            callback
        }))
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
            </div>
        </div>
    )
}