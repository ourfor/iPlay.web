import { useEffect } from "react"
import style from "./index.module.scss"
import { Spin } from "@components/animation/Spin"
import { config } from "@api/config"
import { usePromise } from "@hook/usePromise"
import { Card } from "@components/card/Card"
import { Tag } from "antd"
import { Button } from "@radix-ui/themes"
import { useAppDispatch } from "@data/StoreHook"
import { DialogID, openDialog } from "@data/Event"
import { AddSiteDialog } from "./AddSiteDialog"
import { DashIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { AppstoreOutlined, LoginOutlined } from '@ant-design/icons'

export default function Page() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const sites = usePromise(() => config.iplay?.getAllSites())
    return (
        <div className={style.page}>
            {sites.loading ? <Spin /> : null}
            {sites.data?.data?.map((site) => (
                <div style={{padding: "0.5rem"}}>
                <Card className={style.row}>
                    <span style={{flexGrow: 1}}>
                        {site.remark}
                    </span>
                    <span>
                        <Tag icon={<LoginOutlined />} color="red" style={{cursor: "pointer"}} onClick={() => navigate(`/?site=${site.id}`) }>
                            Open
                        </Tag>
                        <Tag icon={<AppstoreOutlined />} color="green">
                            {site.type}
                        </Tag>
                    </span>
                </Card>
                </div>
            ))}

            <AddSiteDialog />
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <Button style={{width: "8rem"}} onClick={() => dispatch(openDialog({id: DialogID.ADD_SITE, visible: true}))}>添加</Button>
            </div>
        </div>
    )
}