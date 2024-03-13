import { useEffect } from "react"
import style from "./index.module.scss"
import {animated, useChain, useSpring, useSpringRef, useTransition} from "@react-spring/web"
import { Api } from "@api/emby"
import { logger } from "@helper/log"

export default function Page() {
    const data = [1, 2, 3, 4]
    const springRef = useSpringRef()
    const style1 = useSpring({
        ref: springRef,
        from: {
            scale: 1,
        },
        to: {
            scale: 1.2
        }
    })
    const transitionRef = useSpringRef()
    const transition = useTransition(data, {
        ref: transitionRef,
        from: {x: 0},
        enter: {x: 100},
        leave: {x: 0}
    })
    useChain([springRef, transitionRef], [0, 3])
    useEffect(() => {

    }, [])
    return (
        <div className={style.page}>
            {transition((style, idx) => (
                <animated.div style={{...style1, ...style}}>{idx}</animated.div>
            ))}
        </div>
    )
}