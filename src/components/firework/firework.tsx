import { useEffect, useRef } from 'react';
import { CursorSpecialEffects } from './fireworks.js';
import { init } from './firework2.js';

export function Firework(){

    const dom = useRef(null)
    useEffect(() => {
        init(dom.current);
        // const cursorSpecialEffects = new CursorSpecialEffects()
        // cursorSpecialEffects.init()
    }, [])

    const style = {
        position: 'fixed',
        left: '0',
        top: '0',
        zIndex: '1',
        pointerEvents: "none"
    }

    return (
    <canvas ref={dom} 
        className='fireworks' 
        style={style as any} />
    )
}

export default Firework;