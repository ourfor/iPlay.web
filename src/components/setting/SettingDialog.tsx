import style from "./Setting.module.scss"
import { Button, Input, Modal, Select, Tag } from "antd";
import Setting, { updateEmbyConfig } from "@data/Setting";
import { useKeyboard } from "@hook/useKeyboard";
import { useAppDispatch, useAppSelector } from "@data/StoreHook";
import { DialogID, openDialog } from "@data/Event";
import { DEFAULT_EMBY_CONFIG, EmbyConfig } from "@api/config";
import { EmbySetting } from "./Setting";
import { Box, Tabs } from "@radix-ui/themes";
import _ from "lodash";
import { updateActiveId, updateSite, updateSiteConfig } from "@data/Site";

export function SettingDialog() {
    const dialog = useAppSelector(state => state.event.dialog)
    const sites = useAppSelector(state => state.site.sites)
    const activeId = useAppSelector(state => state.site.site.id)
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

    const updateConfig = (id: string, config: Partial<EmbyConfig>, name?: string) => {
        dispatch(updateSiteConfig({
            id,
            name,
            emby: config as any
        }))
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
            <Tabs.Root defaultValue={_.first(Object.values(sites))?.id}>
                <Tabs.List>
                    {Object.entries(sites).map(([id, site]) => 
                        <Tabs.Trigger className={style.tabName} key={id} value={id}>{site?.name ?? id}</Tabs.Trigger>
                    )}
                    <Button size="small"
                        onClick={() => dispatch(updateSite({
                            id: `${Date.now()}`,
                            name: `默认`,
                            user: null,
                            emby: DEFAULT_EMBY_CONFIG
                        } as any))}
                        style={{marginLeft: "1rem"}}> + </Button>
                </Tabs.List>
                <Box px="4" pt="3" pb="2">
                    {Object.entries(sites).map(([id, site]) => 
                        <Tabs.Content key={id} value={id}>
                            <div className={style.inline}>
                                <p className={style.title}>名称</p>
                                <Input value={site?.name} onChange={e => updateConfig(id,{}, e.target.value)} />
                            </div>
                            <EmbySetting id={id}
                                activeId={activeId}
                                active={id => dispatch(updateActiveId(id))}
                                setting={site!.emby} updateConfig={v => updateConfig(id, v, site?.name)} />
                        </Tabs.Content>
                    )}
                </Box>
            </Tabs.Root>
        </Modal>
    )
}