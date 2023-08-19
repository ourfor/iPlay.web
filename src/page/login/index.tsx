import { Button, Checkbox, Stack, TextField } from "@mui/material"
import style from "./index.module.scss"
import { useState } from "react"
import { log } from "@helper/log"
import { useAppDispatch } from "@data/StoreHook"
import { updateUser } from "@data/User"
import { useNavigate } from "react-router-dom"
import { Api, Emby } from "@api/emby"
import SettingIcon from "@components/setting/SettingIcon"
import { DialogID, openDialog } from "@data/Event"
import { SettingDialog } from "@components/setting/SettingDialog"
import { produceMessage } from "@data/Message"

const customStyle = {
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#B2BAC2',
        },
    }
}

export default function Page() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const submit = () => {
        Api.login(username, password)
            .then(data => {
                log.info(data)
                Api.emby = new Emby(data)
                dispatch(updateUser(data))
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
            }).catch(e => {
                dispatch(produceMessage({
                    type: "error",
                    data: e
                }))
            })
    }
    return (
        <div className={style["page"]}>
            <div className={style["wrap"]}>
                <div className={style["container"]}>
                    <p className={style["title"]}>登录账号</p>
                    <TextField
                        className={style["input"]}
                        required
                        id="outlined-required"
                        placeholder="用户名"
                        label="Username"
                        value={username}
                        onChange={e => setUserName(e.target.value)}
                        sx={customStyle}
                    />
                    <TextField
                        className={style["input"]}
                        id="outlined-password-input"
                        label="Password"
                        placeholder="密码"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                        sx={customStyle}
                    />

                    <Button className={style["login"]}
                        onClick={submit}
                        variant="contained">
                        登录
                    </Button>
                    <Stack className={style["items"]} direction="row" justifyContent="flex-start" alignItems="center">
                        <Checkbox className={style["remember-me"]}
                            value={remember}
                            onChange={(_, checked) => setRemember(checked)}
                            sx={{ color: "#737373", '&.Mui-checked': { color: "white" } }} /> 记住我
                    </Stack>
                    <Stack className={style["items"]} direction="row" justifyContent="flex-start" alignItems="center">
                        登录表示同意用户协议，版权所有
                    </Stack>
                    <div onClick={() => dispatch(openDialog({id: DialogID.SETTING, visible: true}))} 
                        className={style["tool"]}>
                        <SettingIcon />
                    </div>
                </div>
            </div>
            <SettingDialog />
        </div>
    )
}