import { useEffect, useRef } from 'react';
import { CursorSpecialEffects } from './fireworks.js';

export function Firework(){

    const dom = useRef(null)
    useEffect(() => {
        const cursorSpecialEffects = new CursorSpecialEffects(dom.current)
        cursorSpecialEffects.init()
    }, [])

    return (
        <canvas ref={dom} />
    )
}

export default Firework;