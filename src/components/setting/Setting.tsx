import { DEFAULT_EMBY_CONFIG, EmbyConfig } from "@api/config";
import style from "./Setting.module.scss"
import { Button, Input, Select } from "antd";

export interface SettingProps {
    id: string
    activeId?: string
    setting: EmbyConfig
    active?: (id: string) => void
    updateConfig: (config: Partial<EmbyConfig>) => void
}

export function EmbySetting({ id, activeId, setting, updateConfig, active }: SettingProps) {
    return (
        <>
            <div className={style["inline"]}>
                <p className={style["title"]}>域名</p>
                <Input value={setting.host ?? ""} onChange={e => updateConfig({ host: e.target.value })} />
            </div>
            <div className={style["inline"]}>
                <p className={style["title"]}>协议</p>
                <Select value={setting.protocol}
                    onChange={protocol => updateConfig({ protocol })}
                    options={[
                        { label: "https", value: "https" },
                        { label: "http", value: "http" }
                    ]} />
            </div>
            <div className={style["inline"]}>
                <p className={style["title"]}>端口</p>
                <Input type="number" value={setting.port ?? 8096} onChange={e => updateConfig({ port: Number(e.target.value) })} />
            </div>
            <div className={style["inline"]}>
                <p className={style["title"]}>路径</p>
                <Input value={setting.path ?? "/"} onChange={e => updateConfig({ path: e.target.value })} />
            </div>
            <div className={style["inline"]}>
                <Button onClick={() => active?.(id)} disabled={activeId === id}>激活</Button>
                <Button onClick={() => updateConfig(DEFAULT_EMBY_CONFIG)}>恢复默认设置</Button>
            </div>
        </>
    )
}