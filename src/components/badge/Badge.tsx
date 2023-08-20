import { ReactNode } from "react";

export interface BadgeProps {
    children: ReactNode|ReactNode[]
}

export function Badge({children}: BadgeProps) {
    return (
        <div style={{position: "relative"}}>
            {children}
        </div>
    )
}