import style from "./Setting.module.scss"
import { Button, Input, Modal, Select, Tag } from "antd";
import { updateEmbyConfig } from "@data/Setting";
import { useKeyboard } from "@hook/useKeyboard";
import { useAppDispatch, useAppSelector } from "@data/StoreHook";
import { DialogID, openDialog } from "@data/Event";
import { DEFAULT_EMBY_CONFIG, EmbyConfig } from "@api/config";

export function SettingDialog() {
    const dialog = useAppSelector(state => state.event.dialog)
    const setting = useAppSelector(state => state.setting)
    const dispatch = useAppDispatch()
    useKeyboard(window, {
        "keydown": (e) => {
            let isMatch = true
            if (e.ctrlKey || e.metaKey) {
                if (e.ctrlKey && e.metaKey) {
                    dispatch(openDialog({ id: DialogID.SETTING, visible: true }))
                } else {
                    isMatch = false
                }
            } else {
                isMatch = false
            }
            if (isMatch) e.preventDefault()
        }
    })

    const updateConfig = (config: Partial<EmbyConfig>) => {
        dispatch(updateEmbyConfig(config))
    }

    const Header = (
        <div className={style["header-bar"]}>
            <div>偏好设置</div>
        </div>
    )

    return (
        <Modal title={Header}
            className={style["setting-dialog"]}
            mask={false}
            maskClosable={false}
            open={dialog?.[DialogID.SETTING] ?? false}
            onCancel={() => dispatch(openDialog({ id: DialogID.SETTING, visible: false }))}
            centered footer={null}>
            <div className={style["inline"]}>
                <p className={style["title"]}>域名</p>
                <Input value={setting.emby?.host ?? ""} onChange={e => updateConfig({ host: e.target.value })} />
            </div>
            <div className={style["inline"]}>
                <p className={style["title"]}>协议</p>
                <Select value={setting.emby?.protocol}
                onChange={protocol => updateConfig({protocol})}
                options={[
                    {label: "https", value: "https"},
                    {label: "http", value: "http"}
                ]} />
            </div>
            <div className={style["inline"]}>
                <p className={style["title"]}>端口</p>
                <Input type="number" value={setting.emby?.port ?? 8096} onChange={e => updateConfig({ port: Number(e.target.value) })} />
            </div>
            <div className={style["inline"]}>
                <p className={style["title"]}>路径</p>
                <Input value={setting.emby?.path ?? "/"} onChange={e => updateConfig({ path: e.target.value })} />
            </div>
            <div className={style["inline"]}>
                <Button onClick={() => updateConfig(DEFAULT_EMBY_CONFIG)}>恢复默认设置</Button>
            </div>
        </Modal>
    )
}