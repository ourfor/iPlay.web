import { FormControl, MenuItem, Select, Stack, TextField } from "@mui/material"
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
                <Stack className={style["item"]} direction="row">
                    <p>域名</p>
                    <TextField
                        size="small"
                        className={style["input"]}
                        required
                        id="outlined-required"
                        placeholder={"域名"}
                        label="host"
                        value={config.host}
                        onChange={e => updateConfig({ host: e.target.value })} />
                </Stack>
                <Stack className={style["item"]} direction="row">
                    <p>协议</p>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={config.protocol}
                        // label="protocol"
                        onChange={e => updateConfig({ protocol: e.target.value as any })}>
                        <MenuItem value={"http"}>http</MenuItem>
                        <MenuItem value={"https"}>https</MenuItem>
                    </Select>
                </FormControl>
                </Stack>
                <Stack className={style["item"]} direction="row">
                    <p>路径</p>
                    <TextField
                        size="small"
                        className={style["input"]}
                        required
                        id="outlined-required"
                        placeholder={"路径"}
                        label="path"
                        value={config.path}
                        onChange={e => updateConfig({ path: e.target.value })} />
                </Stack>
                <Stack className={style["item"]} direction="row">
                    <p>端口</p>
                    <TextField
                        size="small"
                        className={style["input"]}
                        required
                        type="number"
                        id="outlined-required"
                        placeholder={"端口"}
                        label="port"
                        value={config.port}
                        onChange={e => updateConfig({ port: Number(e.target.value) })} />
                </Stack>
            </Stack>
        </div>
    )
}