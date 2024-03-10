import classnames from "classnames";
import { ReactNode } from "react";

export interface BadgeProps {
    className?: string
    children: ReactNode|ReactNode[]
}

export function Badge({className, children}: BadgeProps) {
    return (
        <div className={classnames(className)} style={{position: "relative"}}>
            {children}
        </div>
    )
}