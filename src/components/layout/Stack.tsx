import { ReactNode } from "react"
import style from "./Stack.module.scss"

interface StackProps {
    direction: "column"|"row"
    children: ReactNode|ReactNode[]
}

export function Stack(props: StackProps) {
    return (
        <div className={style["stack"]}
            style={{
                display: "flex",
                flexDirection: props.direction ?? "column",
                overflow: "scroll"}
            }>
            {props.children}
        </div>
    )
}