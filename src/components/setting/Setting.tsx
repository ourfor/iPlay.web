import { Stack, TextField } from "@mui/material"
import style from "./Setting.module.scss"
import { useAppSelector } from "@data/StoreHook"
import { DEFAULT_EMBY_CONFIG, EmbyConfig } from "@api/config"
import { useDispatch } from "react-redux"
import { updateEmbyConfig, updateSetting } from "@data/Setting"

export function Setting() {
    const config = useAppSelector(state => state.setting.emby) ?? DEFAULT_EMBY_CONFIG
    const dispatch = useDispatch()
    const updateConfig = (config: Partial<EmbyConfig>) => {
        dispatch(updateEmbyConfig(config))
    }
    return (
        <div className={style["main"]}>
            <Stack direction="column">
            <p>Emby设置</p>
                <Stack direction="row">
                    <TextField
                        className={style["input"]}
                        required
                        id="outlined-required"
                        placeholder="域名"
                        label="host"
                        value={config.host}
                        onChange={e => updateConfig({ host: e.target.value })} />
                </Stack>
            </Stack>
        </div>
    )
}