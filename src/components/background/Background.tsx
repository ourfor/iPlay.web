import style from "./Background.module.scss"

export interface BackgroundProps {
    src: string
}

export function Background({src}: BackgroundProps) {
    return (
        <div className={style["background"]} style={{ "--bg-image": `url(${src})` } as any} />
    )
}