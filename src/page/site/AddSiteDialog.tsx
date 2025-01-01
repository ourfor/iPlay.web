import { Button, Input, Modal, Select } from "antd";
import style from './AddSiteDialog.module.scss'
import { useAppDispatch, useAppSelector } from "@data/StoreHook";
import { DialogID, openDialog } from "@data/Event";
import { useDispatch } from "react-redux";
import { TextField } from "@radix-ui/themes";
import { useState } from "react";
import { logger } from "@helper/log";
import { config } from "@api/config";
import { AddNewSiteModel } from "@api/iPlayApi";
import { produceMessage } from "@data/Message";

export function AddSiteDialog() {
    const dispatch = useAppDispatch()
    const dialog = useAppSelector(state => state.event.dialog)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [remark, setRemark] = useState("")
    const [server, setServer] = useState("")
    const [type, setType] = useState("emby")

    const addNewSite = async (type: string, remark: string, server: string, username: string, password: string) => {
        const data = {
            server,
            username,
            password
        }
        const params = {
            type,
            remark,
            data: JSON.stringify(data)
        }
        logger.info(params)
        const result = await config.iplay?.addNewSite(params)
        if (result?.code === 200) {
            dispatch(produceMessage({
                type: "success",
                data: "站点添加成功",
                duration: 1000
            }))
        }
        logger.info(result)
    }
    return (
        <Modal title={"添加站点"}
            className={style["dialog"]}
            mask={false}
            maskClosable={false}
            open={dialog?.[DialogID.ADD_SITE] ?? false}
            onCancel={() => dispatch(openDialog({ id: DialogID.ADD_SITE, visible: false }))}
            centered footer={null}>
            <div className={style["inline"]}>
                <p className={style["title"]}>备　注</p>
                <Input value={remark ?? ""} onChange={e => setRemark(e.target.value)} />
            </div>
            <div className={style["inline"]}>
                <p className={style["title"]}>类　型</p>
                <Select value={type}
                    onChange={protocol => setType(protocol)}
                    options={[
                        { label: "emby", value: "emby" },
                        { label: "jellyfin", value: "jellyfin" }
                    ]} />
            </div>
            <div className={style["inline"]}>
                <p className={style["title"]}>服务器</p>
                <Input value={server ?? ""} onChange={e => setServer(e.target.value)} />
            </div>
            <div className={style["inline"]}>
                <p className={style["title"]}>用户名</p>
                <Input value={username ?? ""} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className={style["inline"]}>
                <p className={style["title"]}>密　码</p>
                <Input value={password ?? ""} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className={style["inline"]}>
                <Button onClick={() => addNewSite(type, remark, server, username, password)}
                    style={{width: "80%", margin: "0.75rem auto"}}>添加</Button>
            </div>
        </Modal>
    )
}