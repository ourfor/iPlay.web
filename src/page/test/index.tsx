import style from "./index.module.scss"
import {animated, useSpring} from "@react-spring/web"

export default function Page() {
    const [spring, api] = useSpring(() => ({
        from: {
            scale: 1,
            x: 0
        }
    }))
    return (
        <div className={style.page}>
            <animated.div style={{
                width: "5rem",
                height: "5rem",
                background: "red",
                marginTop: "1rem",
                marginRight: "1rem",
                ...spring
            }} onClick={() => api.start({
                from: {
                    scale: 1,
                    x: 0
                },
                to: {
                    scale: 1.2,
                    x: 1000
                }
            })}>
            </animated.div>
        </div>
    )
}