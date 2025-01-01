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

export default function Page() {
    const dispatch = useAppDispatch()
    const sites = usePromise(() => config.iplay?.getAllSites())
    return (
        <div className={style.page}>
            {sites.loading ? <Spin /> : null}
            {sites.data?.data?.map((site) => (
                <div style={{padding: "0.5rem"}}>
                <Card>
                    <span>
                        {site.remark}
                    </span>
                    <Tag color="green" style={{position: "absolute", right: "0.2rem"}}>
                        {site.type}
                    </Tag>
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