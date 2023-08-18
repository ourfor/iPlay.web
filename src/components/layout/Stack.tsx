import { Stack as MStack } from "@mui/material"
import { ReactNode } from "react"
import style from "./Stack.module.scss"

interface StackProps {
    direction: "column"|"row"
    children: ReactNode|ReactNode[]
}

export function Stack(props: StackProps) {
    return (
        <MStack className={style["stack"]} 
            direction={props.direction ?? "column"}
            overflow={"scroll"}>
            {props.children}
        </MStack>
    )
}