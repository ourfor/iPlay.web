import style from "./UnplayedCount.module.scss"
export interface UnplayedCountProps {
    count?: number
}
export function UnplayedCount({count}: UnplayedCountProps) {
    if (!count) return null
    return (
        <div className={style.main}>{count}</div>
    )
}