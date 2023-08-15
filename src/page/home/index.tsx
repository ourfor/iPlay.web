import { publicInfo } from "@api/info"
import { viewByUser } from "@api/view"
import { useAppSelector } from "@data/StoreHook"
import { log } from "@helper/log"
import { usePromise } from "@hook/usePromise"
import { User } from "@model/User"
import { useEffect } from "react"

export default function Page() {
    const {data} = usePromise(publicInfo)
    const user = useAppSelector(state => state.user)
    useEffect(() => {
        log.info(data)
        if (data) {
            document.title = data.ServerName
        }
    }, [data])
    useEffect(() => {
        viewByUser(user as User)
            .then(data => {
                log.info(data)
            })
    }, [user])
    return (
        <div>Hello</div>
    )
}