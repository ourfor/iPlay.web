import { useEffect } from "react"

export type Keyboard = {
    [key in keyof WindowEventMap]: (this: Window, event: WindowEventMap[key]) => any
}

export function useKeyboard(target?: Window | HTMLElement, keyboard?: Partial<Keyboard>) {
    useEffect(() => {
        if (!keyboard || !target) return
        Object.entries(keyboard).forEach(([event, handler]) => {
            target.removeEventListener(event, handler as any)
            target.addEventListener(event, handler as any)
        })
        return () => {
            Object.entries(keyboard).forEach(([event, handler]) => {
                target.removeEventListener(event, handler as any)
            })
        }
    }, [target])
}