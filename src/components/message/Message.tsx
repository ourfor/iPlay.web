import { consumeMessage } from "@data/Message"
import { useAppDispatch, useAppSelector } from "@data/StoreHook"
import useMessage from "antd/es/message/useMessage"
import { useEffect } from "react"

export function Message() {
    const [helper, holder] = useMessage()
    const queue = useAppSelector(state => state.message.queue)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const [data] = queue
        if (data) {
            let fn: typeof helper.info;
            if (data.type === "info") {
                fn = helper.info
            } else if (data.type === "warn") {
                fn = helper.warning
            } else if (data.type === "error") {
                fn = helper.error
            } else {
                fn = helper.success
            }
            fn(data.data)
            setTimeout(() => {
                dispatch(consumeMessage())
            }, 500)
        }
    }, [queue, dispatch, helper])

    return holder
}