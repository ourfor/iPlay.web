import { ReactNode } from "react"
import style from "./Spin.module.scss"
import { animated, useSpring } from "@react-spring/web"
import Lottie from 'lottie-react'
import loadingAnimation from './a2.json'
export function Spin() {
    return (
        <div className={style["animation-spin"]}>
            <Lottie animationData={loadingAnimation} />
        </div>
    )

}

export interface SpinBoxProps {
    children: ReactNode|ReactNode[]
}

export function SpinBox({children}: SpinBoxProps) {
    const styles = useSpring({
        from: {rotate: "0"},
        to: {rotate: "360deg"},
        config: {
            duration: 1500
        },
        loop: true
    })
    return (
        <animated.div className={style.inner} style={{margin: 0, padding: 0, ...styles}}>
            {children}
        </animated.div>
    )
}