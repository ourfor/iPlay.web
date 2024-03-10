import { CSSProperties, ReactNode } from "react"
import style from "./Stack.module.scss"
import classnames from "classnames"

interface StackProps {
    className?: string
    style?: CSSProperties
    direction: "column"|"row"
    children: ReactNode|ReactNode[]
}

export function Stack(props: StackProps) {
    return (
        <div className={classnames(style["stack"], props.className)}
            style={{
                display: "flex",
                flexDirection: props.direction ?? "column",
                overflow: "scroll",
                ...props.style
            }}>
            {props.children}
        </div>
    )
}