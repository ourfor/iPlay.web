import { config } from "@api/config"
import { produceMessage } from "@data/Message"
import { useAppDispatch } from "@data/StoreHook"
import { usePromise } from "@hook/usePromise"
import { useEffect } from "react"
import { QRCode } from "antd"
import { BilibiliQRCodeResponse } from "@api/Bilibili"
import { logger } from "@helper/log"

interface QRCodeRes {
    data: {
        url: string
        auth_code: string
    }
}

async function getQRCode() {
    const url = new URL(`${config.iplay?.server}/sites/bilibili/qrcode`)
    const res = await fetch(url)
    const json = await res.json() as QRCodeRes
    return json.data;
}

async function getScanState(key: string) {
    const url = new URL(`${config.iplay?.server}/sites/bilibili/poll`)
    url.searchParams.append("auth_code", key)
    const res = await fetch(url)
    return await res.json() as BilibiliQRCodeResponse
}

interface QRCodeProps {
    onCompleted?: (data: string) => void
}

export function BilibiliQRCode({ onCompleted }: QRCodeProps) {
    const dispatch = useAppDispatch()
    const qrCode = usePromise(getQRCode, [])
    useEffect(() => {
        if (qrCode.data) {
            const timer = setInterval(async () => {
                const state = await getScanState(qrCode.data?.auth_code ?? "")
                if (state.code === 0) {
                    clearInterval(timer)
                    dispatch(produceMessage({
                        type: "success",
                        data: "扫码成功",
                        duration: 1000
                    }))
                    logger.info(state)
                    onCompleted?.(JSON.stringify(state.data))
                }
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [qrCode])
    return (
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <QRCode value={decodeURI(qrCode?.data?.url ?? "")}
                style={{width: "128px", height: "128px"}}
                 />
        </div>
    )
}