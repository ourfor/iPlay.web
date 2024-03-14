import style from "./Card.module.scss"

export const kCardColors = [
    "cyan", "gold", "magenta", "orange", "lime",
    "green", "blue", "purple", "red", "volcano",
    "pink", "geekblue", "cyan", "gold", "magenta",
]

export interface CardProps {
    children?: React.ReactNode,
    className?: string,
    color?: string
}

export function Card(props: CardProps) {
    let { color = "random" } = props
    if (color === "random") {
        const i = Math.random() * kCardColors.length
        color = kCardColors[Math.floor(i)]
    }
    const inlineStyle = {
        "--my-bg": `var(--my-${color}-1)`,
        "--my-border": `var(--my-${color}-3)`,
        "--my-color": `var(--my-${color}-7)`,
    } as any
    return (
        <div style={inlineStyle} 
            className={[style.card, props.className].join(" ")}>
            {props.children}
        </div>
    )
}